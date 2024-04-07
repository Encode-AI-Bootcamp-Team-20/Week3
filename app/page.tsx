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

  return (
    <div className="container mx-auto px-4 py-8 h-lvh">
      <h1 className="text-4xl font-bold mb-8">I want an image</h1>
      <p>I want a
        <select
          id="genre"
          name="genre"
          value={genre}
          className="p-2 m-2 bg-transparent border rounded-md bg-teal-100"
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">…</option>
          {genres.map((g) => <option value={g}>{g}</option>)}
        </select>
      </p>
      {genre && <p>
        …of a
        <select
          id="subject"
          name="subject"
          value={subject}
          className="p-2 m-2 bg-transparent border rounded-md bg-teal-100"
          onChange={(e) => setSubject(e.target.value)}
        >
          <option value="">…</option>
          {subjects.map((s) => <option value={s}>{s}</option>)}
        </select>
      </p>}
      {genre && subject && <p>
        …with a
        <select
          id="accessory"
          name="accessory"
          value={accessory}
          className="p-2 m-2 bg-transparent border rounded-md bg-teal-100"
          onChange={(e) => setAccessory(e.target.value)}
        >
          <option value="">…</option>
          {accessories.map((a) => <option value={a}>{a}</option>)}
        </select>
      </p>}
      {genre && subject && <p>
        …
        <select
          id="activity"
          name="activity"
          value={activity}
          className="p-2 m-2 bg-transparent border rounded-md bg-teal-100"
          onChange={(e) => setActivity(e.target.value)}
        >
          <option value="">…</option>
          {activities.map((a) => <option value={a}>{a}</option>)}
        </select>
      </p>}
      {genre && subject && <p>
        …on a
        <select
          id="location"
          name="location"
          value={location}
          className="p-2 m-2 bg-transparent border rounded-md bg-teal-100"
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">…</option>
          {locations.map((l) => <option value={l}>{l}</option>)}
        </select>
      </p>}
      {genre && subject && <button
        className="p-4 border rounded-md shadow-sm font-medium bg-green-300"
        disabled={isPromptLoading || isImageLoading}
      >Generate prompt</button>}
    </div>
  );
}
