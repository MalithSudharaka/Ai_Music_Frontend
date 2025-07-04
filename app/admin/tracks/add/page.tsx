"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaCloudUploadAlt, FaFileAudio } from "react-icons/fa";
import { getGenres, Genre } from '../genres/genres';
import { initialBeats } from '../beats/page';
import { initialTags } from '../tags/page';

const typeOptions = ["Song", "Beats", "Beats w/hook", "Top lines", "Vocal"];
const moodOptions = [
  "Bouncy", "Dark", "Energetic", "Soulful", "Inspiring", "Confident", "Sad", "Mellow", "Relaxed", "Calm", "Angry", "Happy", "Epic", "Accomplished", "Quirky", "Determined", "Crazy", "Loved", "Intense", "Powerful", "Dirty", "Lonely", "Depressed", "Hyper", "Flirty", "Grateful", "Rebellious", "Peaceful", "Evil", "Adored", "Gloomy", "Romantic", "Anxious", "Crunk", "Eccentric", "Neutral", "Exciting", "Dramatic", "Enraged", "Tense", "Majestic", "Annoyed", "Disappointed", "Lazy", "Silly", "Giddy", "Frantic", "Scared", "Scary", "Chill", "Bold", "Melancholy", "Seductive", "Dreamy", "Carefree", "Restless", "Mysterious", "Dancy", "Euphoric", "Rage", "Warm", "Optimistic", "Uplifting", "Sentimental", "Hopeful", "Cheerful", "Soothing", "Heartfelt", "Playful"
];
const energyOptions = ["High", "Medium", "Low"];
const instrumentOptions = [
  "Percussion", "Piano", "Acoustic guitar", "Bass guitar", "Electric guitar", "Strings", "Violin", "Cymbals", "Brass", "Flute", "Organ", "Bass", "Synth", "Beats", "Cello", "Trumpet", "Double Bass", "Saxophone", "Viola", "Triangle", "Recorder", "Banjo", "Guitar", "French Horn", "Keys", "Trombone", "Tambourine", "Bassoon", "Ukulele", "Harpsichord", "Tuba", "Clarinet", "Harp", "Oboe", "Harmonica", "Piccolo", "Sitar", "Maracas", "Castanets", "Mandolin", "Lute", "Gong", "Bugle"
];
const platformOptions = ["Bandcamp", "Soundcloud", "Apple Music"];
const trackKeyOptions = [
  "None", "Cm", "Dm", "Em", "Fm", "Gm", "Bm", "F♯m", "Am", "C♯m", "D♯m", "G♯m", "A♯m", "E♭m", "CM", "B♭m", "DM", "A♭m", "GM", "EM", "AM", "FM", "BM", "F♯M", "D♭m", "E♭M", "A♭M", "C♯M", "D♭M", "B♭M", "A♯M", "G♭M", "C♭M", "D♯M", "G♯M"
];

export default function AddTrackPage() {
  const [publish, setPublish] = useState("Private");
  const [genre, setGenre] = useState<string[]>([]);
  const [beat, setBeat] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [trackImage, setTrackImage] = useState<string | null>(null);
  const [trackFile, setTrackFile] = useState<File | null>(null);
  const [genresData, setGenresData] = useState<Genre[]>([]);
  const [beatsData, setBeatsData] = useState<{ id: number; name: string; description: string; }[]>([]);
  const [tagsData, setTagsData] = useState<{ id: number; name: string; description: string; }[]>([]);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dropdowns, setDropdowns] = useState<{
    genreOptions: string[];
    beatOptions: string[];
    tagOptions: string[];
  }>({
    genreOptions: [],
    beatOptions: [],
    tagOptions: [],
  });

  useEffect(() => {
    getGenres().then(setGenresData);
    setBeatsData(initialBeats);
    setTagsData(initialTags);
  }, []);

  // Find Electronics1 genre
  const electronics1Genre = genresData.find(g => g.name === "Electronics1");

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setTrackImage(URL.createObjectURL(file));
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setTrackFile(file);
    }
  }

  return (
    <div className="min-h-screen p-8 bg-[#081028]">
      <h1 className="text-3xl font-bold text-white mb-8">Track Management <span className="text-lg font-normal text-gray-400">Add Tracks</span></h1>
      <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Main Form */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#101936] rounded-2xl p-8 shadow-xl">
            <div>
              <label className="block text-gray-300 mb-2">Track Name</label>
              <input className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none" />
            </div>
            <div className="relative">
              <label className="block text-gray-300 mb-2 flex items-center gap-2">
                Track ID
                <span className="relative group cursor-pointer">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-[#232B43] text-xs text-[#7ED7FF]">i</span>
                  <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#232B43] text-white text-xs rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20">
                    This is your track's unique identifier, used for internal organization and reference
                  </span>
                </span>
              </label>
              <input className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none" />
            </div>
            <div className="relative">
              <label className="block text-gray-300 mb-2 flex items-center gap-2">
                BPM
                <span className="relative group cursor-pointer">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-[#232B43] text-xs text-[#7ED7FF]">i</span>
                  <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#232B43] text-white text-xs rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20">
                  Beats per minute – controls the speed of your track.
                  </span>
                </span>
              </label>
              <input type="text" inputMode="numeric" pattern="[0-9]*" className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none" />
            </div>
            <div className="relative">
              <label className="block text-gray-300 mb-2">Track Key</label>
              <div className="relative">
                <select className="w-full bg-[#181F36] text-white rounded-xl px-4 py-2 border border-[#232B43] focus:border-[#E100FF] focus:ring-2 focus:ring-[#E100FF] transition-all appearance-none shadow-sm">
                  {trackKeyOptions.map(opt => <option key={opt}>{opt}</option>)}
                </select>
                <span className="pointer-events-none absolute right-4 top-3 text-gray-400 text-lg">▼</span>
              </div>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Track Price</label>
              <input type="text" className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none" />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Musician</label>
              <input className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none" />
            </div>
            <div className="relative">
              <label className="block text-gray-300 mb-2">Track Type</label>
              <select className="w-full bg-[#181F36] text-white rounded-xl px-4 py-2 border border-[#232B43] focus:border-[#E100FF] focus:ring-2 focus:ring-[#E100FF] transition-all appearance-none shadow-sm">
                {typeOptions.map(opt => <option key={opt}>{opt}</option>)}
              </select>
              <span className="pointer-events-none absolute right-4 top-9 text-gray-400 text-lg">▼</span>
            </div>
            <div className="relative">
              <label className="block text-gray-300 mb-2">Mood Type</label>
              <select className="w-full bg-[#181F36] text-white rounded-xl px-4 py-2 border border-[#232B43] focus:border-[#E100FF] focus:ring-2 focus:ring-[#E100FF] transition-all appearance-none shadow-sm">
                {moodOptions.map(opt => <option key={opt}>{opt}</option>)}
              </select>
              <span className="pointer-events-none absolute right-4 top-9 text-gray-400 text-lg">▼</span>
            </div>
            <div className="relative">
              <label className="block text-gray-300 mb-2">Energy Type</label>
              <select className="w-full bg-[#181F36] text-white rounded-xl px-4 py-2 border border-[#232B43] focus:border-[#E100FF] focus:ring-2 focus:ring-[#E100FF] transition-all appearance-none shadow-sm">
                {energyOptions.map(opt => <option key={opt}>{opt}</option>)}
              </select>
              <span className="pointer-events-none absolute right-4 top-9 text-gray-400 text-lg">▼</span>
            </div>
            <div className="relative">
              <label className="block text-gray-300 mb-2">Instrument</label>
              <select className="w-full bg-[#181F36] text-white rounded-xl px-4 py-2 border border-[#232B43] focus:border-[#E100FF] focus:ring-2 focus:ring-[#E100FF] transition-all appearance-none shadow-sm">
                {instrumentOptions.map(opt => <option key={opt}>{opt}</option>)}
              </select>
              <span className="pointer-events-none absolute right-4 top-9 text-gray-400 text-lg">▼</span>
            </div>
            <div className="relative">
              <label className="block text-gray-300 mb-2 flex items-center gap-2">
                Generated Track Platform
                <span className="relative group cursor-pointer">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-[#232B43] text-xs text-[#7ED7FF]">i</span>
                  <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#232B43] text-white text-xs rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20">
                    The platform used to generate this track.<br/>Ex - Boomy, Soundraw, AIVA
                  </span>
                </span>
              </label>
              <select className="w-full bg-[#181F36] text-white rounded-xl px-4 py-2 border border-[#232B43] focus:border-[#E100FF] focus:ring-2 focus:ring-[#E100FF] transition-all appearance-none shadow-sm">
                {platformOptions.map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Track Image */}
              <div className="flex-1">
                <label className="block text-gray-300 mb-2">Track Image</label>
                <div
                  className="flex flex-col items-center justify-center border-2 border-dashed border-[#232B43] rounded-xl bg-[#181F36] p-4 cursor-pointer hover:border-[#E100FF] transition"
                  onClick={() => imageInputRef.current?.click()}
                >
                  {trackImage ? (
                    <img src={trackImage} alt="Track" className="w-20 h-20 object-cover rounded-lg mb-2" />
                  ) : (
                    <FaCloudUploadAlt className="text-4xl text-[#7ED7FF] mb-2" />
                  )}
                  <span className="text-xs text-gray-400">Click or drag to upload image</span>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              {/* Track Upload */}
              <div className="flex-1">
                <label className="block text-gray-300 mb-2 flex items-center gap-2">
                  Track Upload
                  <span className="relative group cursor-pointer">
                    <span className="w-5 h-5 flex items-center justify-center rounded-full bg-[#232B43] text-xs text-[#7ED7FF]">i</span>
                    <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#232B43] text-white text-xs rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20">
                      Accepted formats: MP3, WAV, max 20MB.
                    </span>
                  </span>
                </label>
                <div
                  className="flex flex-col items-center justify-center border-2 border-dashed border-[#232B43] rounded-xl bg-[#181F36] p-4 cursor-pointer hover:border-[#E100FF] transition"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FaFileAudio className="text-4xl text-[#E100FF] mb-2" />
                  <span className="text-xs text-gray-400">
                    {trackFile ? trackFile.name : "Click or drag to upload audio file"}
                  </span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/mp3,audio/wav"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
            <div className="md:col-span-2 relative">
              <label className="block text-gray-300 mb-2 flex items-center gap-2">
                About
                <span className="relative group cursor-pointer">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-[#232B43] text-xs text-[#7ED7FF]">i</span>
                  <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 bg-[#232B43] text-white text-xs rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20">
                    Describe your track: genre, instruments, mood, or any special production notes.
                  </span>
                </span>
              </label>
              <textarea rows={4} className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none" placeholder="Describe your track, genre, instruments, mood or any special production notes." />
            </div>
          </div>
        </div>
        {/* Right: Sidebar Sections */}
        <div className="flex flex-col gap-8">
          {/* Publish Section */}
          <div className="bg-[#101936] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <label className="block text-gray-300 mb-2">Publish</label>
            <div className="relative">
              <select value={publish} onChange={e => setPublish(e.target.value)} className="w-full bg-[#181F36] text-white rounded-xl px-4 py-2 border border-[#232B43] focus:border-[#E100FF] focus:ring-2 focus:ring-[#E100FF] transition-all appearance-none shadow-sm">
                <option>Private</option>
                <option>Public</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-3 text-gray-400 text-lg">▼</span>
            </div>
            <button className="mt-4 w-full py-2 rounded-lg bg-[#E100FF] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#c800d6] transition-colors">
              Add Track <span className="ml-2">→</span>
            </button>
          </div>
          {/* Genres Category */}
          <div className="bg-[#101936] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <label className="block text-gray-300 mb-2">Genres Category</label>
            <input className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 mb-2" placeholder="Enter Category..." />
            <label className="block text-gray-400 text-xs mb-2">All categories</label>
            <div className="relative">
              <select className="w-full bg-[#181F36] text-white rounded-xl px-4 py-2 border border-[#232B43] focus:border-[#E100FF] focus:ring-2 focus:ring-[#E100FF] transition-all appearance-none shadow-sm">
                {genresData.map(genre => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-3 text-gray-400 text-lg">▼</span>
            </div>
          </div>
          {/* Beat Category */}
          <div className="bg-[#101936] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <label className="block text-gray-300 mb-2">Beat Category</label>
            <input className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 mb-2" placeholder="Enter Category..." />
            <label className="block text-gray-400 text-xs mb-2">All categories</label>
            <div className="relative">
              <select className="w-full bg-[#181F36] text-white rounded-xl px-4 py-2 border border-[#232B43] focus:border-[#E100FF] focus:ring-2 focus:ring-[#E100FF] transition-all appearance-none shadow-sm">
                {beatsData.map(beat => (
                  <option key={beat.id} value={beat.id}>{beat.name}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-3 text-gray-400 text-lg">▼</span>
            </div>
          </div>
          {/* Track Tags */}
          <div className="bg-[#101936] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <label className="block text-gray-300 mb-2">Track Tags</label>
            <input className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 mb-2" placeholder="Enter Category..." />
            <label className="block text-gray-400 text-xs mb-2">All categories</label>
            <div className="relative">
              <select className="w-full bg-[#181F36] text-white rounded-xl px-4 py-2 border border-[#232B43] focus:border-[#E100FF] focus:ring-2 focus:ring-[#E100FF] transition-all appearance-none shadow-sm">
                {tagsData.map(tag => (
                  <option key={tag.id} value={tag.id}>{tag.name}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-3 text-gray-400 text-lg">▼</span>
            </div>
          </div>
          {/* SEO Setting */}
          <div className="bg-[#101936] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <label className="block text-gray-300 mb-2">Seo Setting</label>
            <input className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 mb-2" placeholder="Seo Title" />
            <input className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 mb-2" placeholder="Meta keyword" />
            <input className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 mb-2" placeholder="Meta description" />
          </div>
        </div>
      </form>
    </div>
  );
} 