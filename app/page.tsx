"use client";

import { useState } from 'react';

const genres = ['photo', 'drawing', 'painting', 'blueprint', 'x-ray'];
const subjects = ['man', 'woman', 'boy', 'girl', 'dog', 'cat', 'rabbit', 'dinosaur', 'extraterrestrial'];
const accessories = ['book', 'flower', 'sword', 'phone', 'violin', 'paintbrush', 'bottle', 'hammer'];
const activities = ['singing opera', 'dancing step', 'paying tennis', 'digging a hole', 'cooking barbecue', 'riding a unicycle', 'building a house', 'writing a letter'];
const locations = ['street', 'beach', 'cliff', 'boat', 'bridge', 'hill', 'sofa', 'plane'];

export default function Home() {
  const [genre, setGenre] = useState("");
  const [subject, setSubject] = useState("");
  const [accessory, setAccessory] = useState("");
  const [activity, setActivity] = useState("");
  const [location, setLocation] = useState("");

  const [isPromptLoading, setPromptLoading] = useState(false);
  const [isImageLoading, setImageLoading] = useState(false);

  const [prompt, setPrompt] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [model, setModel] = useState("dall-e-2");
  const [quality, setQuality] = useState("standard");
  const [style, setStyle] = useState("vivid");

  return (
    <div className="container mx-auto px-4 py-8 h-lvh">
      <h1 className="text-4xl font-bold mb-8">I want an image</h1>
      <p>I want a
        <select
          id="genre"
          name="genre"
          value={genre}
          className="p-2 m-2 bg-transparent border rounded-md bg-blue-100"
          onChange={(e) => setGenre(e.target.value)}
        >
          <option key="" value="">…</option>
          {genres.map((g) => <option key={g} value={g} className="text-black">{g}</option>)}
        </select>
      </p>
      {genre && <p>
        …of a
        <select
          id="subject"
          name="subject"
          value={subject}
          className="p-2 m-2 bg-transparent border rounded-md bg-blue-100"
          onChange={(e) => setSubject(e.target.value)}
        >
          <option key="" value="">…</option>
          {subjects.map((s) => <option key={s} value={s} className="text-black">{s}</option>)}
        </select>
      </p>}
      {genre && subject && <p>
        …with a
        <select
          id="accessory"
          name="accessory"
          value={accessory}
          className="p-2 m-2 bg-transparent border rounded-md bg-blue-100"
          onChange={(e) => setAccessory(e.target.value)}
        >
          <option key="" value="">…</option>
          {accessories.map((a) => <option key={a} value={a} className="text-black">{a}</option>)}
        </select>
      </p>}
      {genre && subject && <p>
        …
        <select
          id="activity"
          name="activity"
          value={activity}
          className="p-2 m-2 bg-transparent border rounded-md bg-blue-100"
          onChange={(e) => setActivity(e.target.value)}
        >
          <option key="" value="">…</option>
          {activities.map((a) => <option key={a} value={a} className="text-black">{a}</option>)}
        </select>
      </p>}
      {genre && subject && <p>
        …on a
        <select
          id="location"
          name="location"
          value={location}
          className="p-2 m-2 bg-transparent border rounded-md bg-blue-100"
          onChange={(e) => setLocation(e.target.value)}
        >
          <option key="" value="">…</option>
          {locations.map((l) => <option key={l} value={l} className="text-black">{l}</option>)}
        </select>
      </p>}
      {genre && subject && <button
        className="p-4 m-2 border rounded-md shadow-sm font-medium bg-green-300"
        disabled={isPromptLoading || isImageLoading}
        onClick={(e) => {
          e.preventDefault();
          setGenre(genres[Math.floor(genres.length*Math.random())]);
          setSubject(subjects[Math.floor(subjects.length*Math.random())]);
          setAccessory(accessories[Math.floor(accessories.length*Math.random())]);
          setActivity(activities[Math.floor(activities.length*Math.random())]);
          setLocation(locations[Math.floor(locations.length*Math.random())]);
        }}
      >🎲</button>}
      {genre && subject && <button
        className="p-4 m-2 border rounded-md shadow-sm font-medium bg-green-300"
        disabled={isPromptLoading || isImageLoading}
        onClick={async (e) => {
          e.preventDefault();
          try {
            setPromptLoading(true);
            const response = await fetch("api/prompt", {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({genre, subject, accessory, activity, location}),
            });
            const data = await response.json();
            setPrompt(data.prompt);
          } finally {
            setPromptLoading(false);
          }
        }}
      >{isPromptLoading ? "Generating…" : "Generate prompt"}</button>}
      {genre && subject && prompt && <p><textarea value={prompt} className="w-full h-32"></textarea></p>}
      {genre && subject && prompt && <select
        id="model"
        name="model"
        value={model}
        className="p-2 m-2 bg-transparent border rounded-md bg-blue-100"
        onChange={(e) => setModel(e.target.value)}
      >
        <option value="dall-e-2">DALL-E 2</option>
        <option value="dall-e-3">DALL-E 3</option>
      </select>}
      {genre && subject && prompt && model=="dall-e-3" && <select
        id="quality"
        name="quality"
        value={quality}
        className="p-2 m-2 bg-transparent border rounded-md bg-blue-100"
        onChange={(e) => setQuality(e.target.value)}
      >
        <option value="standard">SD</option>
        <option value="hd">HD</option>
      </select>}
      {genre && subject && prompt && model=="dall-e-3" && <select
        id="style"
        name="style"
        value={style}
        className="p-2 m-2 bg-transparent border rounded-md bg-blue-100"
        onChange={(e) => setStyle(e.target.value)}
      >
        <option value="vivid">Vivid</option>
        <option value="natural">Natural</option>
      </select>}
      {genre && subject && prompt && <button
        className="p-4 m-2 border rounded-md shadow-sm font-medium bg-green-300"
        disabled={isPromptLoading || isImageLoading}
        onClick={async (e) => {
          e.preventDefault();
          try {
            setImageLoading(true);
            const response = await fetch("api/image", {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({prompt, model, quality, style}),
            });
            const data = await response.json();
            setImageURL(data.url);
          } finally {
            setImageLoading(false);
          }
        }}
      >{isImageLoading ? "Generating…" : "Generate image"}</button>}
      {genre && subject && prompt && imageURL && !isImageLoading && <img src={imageURL}></img>}
    </div>
  );
}
