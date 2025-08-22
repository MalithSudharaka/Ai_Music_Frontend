"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaCloudUploadAlt, FaFileAudio } from "react-icons/fa";
import { trackAPI, genreAPI, beatAPI, tagAPI } from '../../../utils/api';

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
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedBeats, setSelectedBeats] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Add new item states
  const [showAddGenre, setShowAddGenre] = useState(false);
  const [showAddBeat, setShowAddBeat] = useState(false);
  const [showAddTag, setShowAddTag] = useState(false);
  const [newGenreName, setNewGenreName] = useState('');
  const [newBeatName, setNewBeatName] = useState('');
  const [newTagName, setNewTagName] = useState('');
  const [newGenreDescription, setNewGenreDescription] = useState('');
  const [newBeatDescription, setNewBeatDescription] = useState('');
  const [newTagDescription, setNewTagDescription] = useState('');
  
  // Loading states for add operations
  const [isAddingGenre, setIsAddingGenre] = useState(false);
  const [isAddingBeat, setIsAddingBeat] = useState(false);
  const [isAddingTag, setIsAddingTag] = useState(false);
  
  // Search states
  const [genreSearch, setGenreSearch] = useState('');
  const [beatSearch, setBeatSearch] = useState('');
  const [tagSearch, setTagSearch] = useState('');
  const [trackImage, setTrackImage] = useState<string | null>(null);
  const [trackFile, setTrackFile] = useState<File | null>(null);
  const [genresData, setGenresData] = useState<{ _id: string; name: string; description: string; color: string; isActive: boolean; }[]>([]);
  const [beatsData, setBeatsData] = useState<{ _id: string; name: string; description: string; color: string; isActive: boolean; }[]>([]);
  const [tagsData, setTagsData] = useState<{ _id: string; name: string; description: string; color: string; isActive: boolean; }[]>([]);
  
  // Form state
  const [formData, setFormData] = useState({
    trackName: '',
    trackId: '',
    bpm: '',
    trackKey: '',
    trackPrice: '',
    musician: '',
    trackType: '',
    moodType: '',
    energyType: '',
    instrument: '',
    generatedTrackPlatform: '',
    about: '',
    seoTitle: '',
    metaKeyword: '',
    metaDescription: ''
  });
  
  // Loading and message states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

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
    // Fetch genres from MongoDB
    const fetchGenres = async () => {
      try {
        const response = await genreAPI.getGenres();
        if (response.success) {
          setGenresData(response.genres);
        }
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    // Fetch beats from MongoDB
    const fetchBeats = async () => {
      try {
        const response = await beatAPI.getBeats();
        if (response.success) {
          setBeatsData(response.beats);
        }
      } catch (error) {
        console.error('Error fetching beats:', error);
      }
    };

    // Fetch tags from MongoDB
    const fetchTags = async () => {
      try {
        const response = await tagAPI.getTags();
        if (response.success) {
          setTagsData(response.tags);
        }
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchGenres();
    fetchBeats();
    fetchTags();
  }, []);



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

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  // Handle multi-select with checkboxes
  const handleGenreToggle = (genreId: string) => {
    setSelectedGenres(prev => 
      prev.includes(genreId) 
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleBeatToggle = (beatId: string) => {
    setSelectedBeats(prev => 
      prev.includes(beatId) 
        ? prev.filter(id => id !== beatId)
        : [...prev, beatId]
    );
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  // Filtered data based on search
  const filteredGenres = genresData.filter(genre =>
    genre.name.toLowerCase().includes(genreSearch.toLowerCase()) ||
    genre.description.toLowerCase().includes(genreSearch.toLowerCase())
  );

  const filteredBeats = beatsData.filter(beat =>
    beat.name.toLowerCase().includes(beatSearch.toLowerCase()) ||
    beat.description.toLowerCase().includes(beatSearch.toLowerCase())
  );

  const filteredTags = tagsData.filter(tag =>
    tag.name.toLowerCase().includes(tagSearch.toLowerCase()) ||
    tag.description.toLowerCase().includes(tagSearch.toLowerCase())
  );

  // Add new item functions
  const handleAddGenre = async () => {
    if (!newGenreName.trim() || isAddingGenre) return;
    
    setIsAddingGenre(true);
    try {
      const response = await genreAPI.createGenre({
        name: newGenreName.trim(),
        description: newGenreDescription.trim()
      });
      
      if (response.success) {
        // Add the new genre to the list and select it
        const newGenre = response.genre;
        console.log('New genre created:', newGenre);
        
        // Ensure we're using the correct ID field
        const genreId = newGenre._id || (newGenre as any).id;
        
        setGenresData(prev => {
          // Check if genre already exists to avoid duplicates
          const exists = prev.find(g => g._id === genreId);
          if (exists) {
            console.log('Genre already exists in state:', exists);
            return prev;
          }
          return [...prev, {
            _id: genreId,
            name: newGenre.name,
            description: newGenre.description,
            color: newGenre.color,
            isActive: newGenre.isActive
          }];
        });
        
        setSelectedGenres(prev => {
          // Check if already selected to avoid duplicates
          if (prev.includes(genreId)) {
            return prev;
          }
          return [...prev, genreId];
        });
        
        // Reset form
        setNewGenreName('');
        setNewGenreDescription('');
        setShowAddGenre(false);
      }
    } catch (error) {
      console.error('Error adding genre:', error);
    } finally {
      setIsAddingGenre(false);
    }
  };

  const handleAddBeat = async () => {
    if (!newBeatName.trim() || isAddingBeat) return;
    
    setIsAddingBeat(true);
    try {
      const response = await beatAPI.createBeat({
        name: newBeatName.trim(),
        description: newBeatDescription.trim()
      });
      
      if (response.success) {
        // Add the new beat to the list and select it
        const newBeat = response.beat;
        console.log('New beat created:', newBeat);
        
        // Ensure we're using the correct ID field
        const beatId = newBeat._id || (newBeat as any).id;
        
        setBeatsData(prev => {
          // Check if beat already exists to avoid duplicates
          const exists = prev.find(b => b._id === beatId);
          if (exists) {
            console.log('Beat already exists in state:', exists);
            return prev;
          }
          return [...prev, {
            _id: beatId,
            name: newBeat.name,
            description: newBeat.description,
            color: newBeat.color,
            isActive: newBeat.isActive
          }];
        });
        
        setSelectedBeats(prev => {
          // Check if already selected to avoid duplicates
          if (prev.includes(beatId)) {
            return prev;
          }
          return [...prev, beatId];
        });
        
        // Reset form
        setNewBeatName('');
        setNewBeatDescription('');
        setShowAddBeat(false);
      }
    } catch (error) {
      console.error('Error adding beat:', error);
    } finally {
      setIsAddingBeat(false);
    }
  };

  const handleAddTag = async () => {
    if (!newTagName.trim() || isAddingTag) return;
    
    setIsAddingTag(true);
    try {
      const response = await tagAPI.createTag({
        name: newTagName.trim(),
        description: newTagDescription.trim()
      });
      
      if (response.success) {
        // Add the new tag to the list and select it
        const newTag = response.tag;
        console.log('New tag created:', newTag);
        
        // Ensure we're using the correct ID field
        const tagId = newTag._id || (newTag as any).id;
        
        setTagsData(prev => {
          // Check if tag already exists to avoid duplicates
          const exists = prev.find(t => t._id === tagId);
          if (exists) {
            console.log('Tag already exists in state:', exists);
            return prev;
          }
          return [...prev, {
            _id: tagId,
            name: newTag.name,
            description: newTag.description,
            color: newTag.color,
            isActive: newTag.isActive
          }];
        });
        
        setSelectedTags(prev => {
          // Check if already selected to avoid duplicates
          if (prev.includes(tagId)) {
            return prev;
          }
          return [...prev, tagId];
        });
        
        // Reset form
        setNewTagName('');
        setNewTagDescription('');
        setShowAddTag(false);
      }
    } catch (error) {
      console.error('Error adding tag:', error);
    } finally {
      setIsAddingTag(false);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Validate required fields
      if (!formData.trackName || !formData.trackId || !formData.trackType) {
        setSubmitMessage('Please fill in all required fields (Track Name, Track ID, and Track Type)');
        setIsSubmitting(false);
        return;
      }

      const trackData = {
        ...formData,
        bpm: formData.bpm ? parseInt(formData.bpm) : undefined,
        trackPrice: formData.trackPrice ? parseFloat(formData.trackPrice) : 0,
        trackImage: trackImage || '',
        trackFile: trackFile ? trackFile.name : '',
        publish: publish,
        genreCategory: selectedGenres,
        beatCategory: selectedBeats,
        trackTags: selectedTags
      };

      console.log('Sending track data:', trackData);

      const response = await trackAPI.createTrack(trackData);
      
      if (response.success) {
        setSubmitMessage('Track created successfully!');
        // Reset form
        setFormData({
          trackName: '',
          trackId: '',
          bpm: '',
          trackKey: '',
          trackPrice: '',
          musician: '',
          trackType: '',
          moodType: '',
          energyType: '',
          instrument: '',
          generatedTrackPlatform: '',
          about: '',
          seoTitle: '',
          metaKeyword: '',
          metaDescription: ''
        });
        setSelectedGenres([]);
        setSelectedBeats([]);
        setSelectedTags([]);
        setTrackImage(null);
        setTrackFile(null);
        setPublish('Private');
      }
    } catch (error: any) {
      console.error('Error creating track:', error);
      console.error('Error response:', error.response?.data);
      setSubmitMessage(
        error.response?.data?.details || 
        error.response?.data?.message || 
        'Failed to create track. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen p-8 bg-[#081028]">
      <h1 className="text-3xl font-bold text-white mb-8">Track Management <span className="text-lg font-normal text-gray-400 ml-4">Add Tracks</span></h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Main Form */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#101936] rounded-2xl p-8 shadow-xl">
            <div>
              <label className="block text-gray-300 mb-2">Track Name *</label>
              <input 
                name="trackName"
                value={formData.trackName}
                onChange={handleInputChange}
                className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none" 
                required
              />
            </div>
            <div className="relative">
              <label className="block text-gray-300 mb-2 flex items-center gap-2">
                Track ID *
                <span className="relative group cursor-pointer">
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-[#232B43] text-xs text-[#7ED7FF]">i</span>
                  <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-[#232B43] text-white text-xs rounded-lg px-3 py-2 shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20">
                    This is your track's unique identifier, used for internal organization and reference
                  </span>
                </span>
              </label>
              <input 
                name="trackId"
                value={formData.trackId}
                onChange={handleInputChange}
                className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none" 
                required
              />
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
              <input 
                name="bpm"
                type="text" 
                inputMode="numeric" 
                pattern="[0-9]*" 
                value={formData.bpm}
                onChange={handleInputChange}
                className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none" 
              />
            </div>
            <div className="relative">
              <label className="block text-gray-300 mb-2">Track Key</label>
              <div className="relative">
                <select 
                  name="trackKey"
                  value={formData.trackKey}
                  onChange={handleInputChange}
                  className="w-full bg-[#181F36] text-white rounded-xl px-4 py-2 border border-[#232B43] focus:border-[#E100FF] focus:ring-2 focus:ring-[#E100FF] transition-all appearance-none shadow-sm"
                >
                  <option value="">Select Track Key</option>
                  {trackKeyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <span className="pointer-events-none absolute right-4 top-3 text-gray-400 text-lg">▼</span>
              </div>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Track Price</label>
              <input 
                name="trackPrice"
                type="text" 
                value={formData.trackPrice}
                onChange={handleInputChange}
                className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none" 
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Musician</label>
              <input 
                name="musician"
                value={formData.musician}
                onChange={handleInputChange}
                className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none" 
              />
            </div>
            <div className="relative">
              <label className="block text-gray-300 mb-2">Track Type *</label>
              <select 
                name="trackType"
                value={formData.trackType}
                onChange={handleInputChange}
                className="w-full bg-[#181F36] text-white rounded-xl px-4 py-2 border border-[#232B43] focus:border-[#E100FF] focus:ring-2 focus:ring-[#E100FF] transition-all appearance-none shadow-sm"
                required
              >
                <option value="">Select Track Type</option>
                {typeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <span className="pointer-events-none absolute right-4 top-9 text-gray-400 text-lg">▼</span>
            </div>
            <div className="relative">
              <label className="block text-gray-300 mb-2">Mood Type</label>
              <select 
                name="moodType"
                value={formData.moodType}
                onChange={handleInputChange}
                className="w-full bg-[#181F36] text-white rounded-xl px-4 py-2 border border-[#232B43] focus:border-[#E100FF] focus:ring-2 focus:ring-[#E100FF] transition-all appearance-none shadow-sm"
              >
                <option value="">Select Mood</option>
                {moodOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <span className="pointer-events-none absolute right-4 top-9 text-gray-400 text-lg">▼</span>
            </div>
            <div className="relative">
              <label className="block text-gray-300 mb-2">Energy Type</label>
              <select 
                name="energyType"
                value={formData.energyType}
                onChange={handleInputChange}
                className="w-full bg-[#181F36] text-white rounded-xl px-4 py-2 border border-[#232B43] focus:border-[#E100FF] focus:ring-2 focus:ring-[#E100FF] transition-all appearance-none shadow-sm"
              >
                <option value="">Select Energy</option>
                {energyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <span className="pointer-events-none absolute right-4 top-9 text-gray-400 text-lg">▼</span>
            </div>
            <div className="relative">
              <label className="block text-gray-300 mb-2">Instrument</label>
              <select 
                name="instrument"
                value={formData.instrument}
                onChange={handleInputChange}
                className="w-full bg-[#181F36] text-white rounded-xl px-4 py-2 border border-[#232B43] focus:border-[#E100FF] focus:ring-2 focus:ring-[#E100FF] transition-all appearance-none shadow-sm"
              >
                <option value="">Select Instrument</option>
                {instrumentOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
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
              <select 
                name="generatedTrackPlatform"
                value={formData.generatedTrackPlatform}
                onChange={handleInputChange}
                className="w-full bg-[#181F36] text-white rounded-xl px-4 py-2 border border-[#232B43] focus:border-[#E100FF] focus:ring-2 focus:ring-[#E100FF] transition-all appearance-none shadow-sm"
              >
                <option value="">Select Platform</option>
                {platformOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
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
              <textarea 
                name="about"
                rows={4} 
                value={formData.about}
                onChange={handleInputChange}
                className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 focus:outline-none" 
                placeholder="Describe your track, genre, instruments, mood or any special production notes." 
              />
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
            {submitMessage && (
              <div className={`mt-4 p-3 rounded-lg text-sm ${
                submitMessage.includes('successfully') 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {submitMessage}
              </div>
            )}
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`mt-4 w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors ${
                isSubmitting 
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                  : 'bg-[#E100FF] text-white hover:bg-[#c800d6]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Adding Track...</span>
                </>
              ) : (
                <>
                  Add Track <span className="ml-2">→</span>
                </>
              )}
            </button>
          </div>
          {/* Genres Category */}
          <div className="bg-[#101936] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label className="block text-gray-300 mb-2">Genres Category</label>
              <button
                type="button"
                onClick={() => setShowAddGenre(!showAddGenre)}
                className="text-[#E100FF] text-sm hover:text-[#c800d6] transition-colors"
              >
                {showAddGenre ? 'Cancel' : '+ Add New'}
              </button>
            </div>
            <input 
              type="text"
              value={genreSearch}
              onChange={(e) => setGenreSearch(e.target.value)}
              className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-1 focus:ring-[#E100FF]" 
              placeholder="Search genres..." 
            />
            <label className="block text-gray-400 text-xs mb-2">All categories</label>
            
            {/* Add New Genre Form */}
            {showAddGenre && (
              <div className="bg-[#232B43] rounded-lg p-4 mb-4 border border-[#E100FF]/30">
                <h4 className="text-white text-sm font-medium mb-3">Add New Genre</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Genre Name"
                    value={newGenreName}
                    onChange={(e) => setNewGenreName(e.target.value)}
                    className="w-full bg-[#181F36] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#E100FF]"
                  />
                  <input
                    type="text"
                    placeholder="Description (optional)"
                    value={newGenreDescription}
                    onChange={(e) => setNewGenreDescription(e.target.value)}
                    className="w-full bg-[#181F36] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#E100FF]"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleAddGenre}
                      disabled={!newGenreName.trim() || isAddingGenre}
                      className="flex-1 bg-[#E100FF] text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-[#c800d6] transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isAddingGenre ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Adding...</span>
                        </>
                      ) : (
                        'Add Genre'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddGenre(false);
                        setNewGenreName('');
                        setNewGenreDescription('');
                      }}
                      className="px-3 py-2 text-gray-400 text-sm hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="max-h-48 overflow-y-auto bg-[#181F36] rounded-lg border border-[#232B43] p-2">
              {filteredGenres.length === 0 ? (
                <div className="text-gray-400 text-sm text-center py-4">
                  {genreSearch ? 'No genres found matching your search' : 'No genres available'}
                </div>
              ) : (
                filteredGenres.map(genre => (
                <div key={genre._id} className="flex items-center gap-3 p-2 hover:bg-[#232B43] rounded cursor-pointer">
                  <input
                    type="checkbox"
                    id={`genre-${genre._id}`}
                    checked={selectedGenres.includes(genre._id)}
                    onChange={() => handleGenreToggle(genre._id)}
                    className="w-4 h-4 text-[#E100FF] bg-[#232B43] border-[#232B43] rounded focus:ring-[#E100FF] focus:ring-2"
                  />
                  <label htmlFor={`genre-${genre._id}`} className="text-white text-sm cursor-pointer flex-1">
                    {genre.name}
                  </label>
                </div>
                ))
              )}
            </div>
            {selectedGenres.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedGenres.map(genreId => {
                  const genre = genresData.find(g => g._id === genreId);
                  return genre ? (
                    <span key={genreId} className="bg-[#E100FF]/20 text-[#E100FF] px-2 py-1 rounded-full text-xs">
                      {genre.name}
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </div>
          {/* Beat Category */}
          <div className="bg-[#101936] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label className="block text-gray-300 mb-2">Beat Category</label>
              <button
                type="button"
                onClick={() => setShowAddBeat(!showAddBeat)}
                className="text-[#E100FF] text-sm hover:text-[#c800d6] transition-colors"
              >
                {showAddBeat ? 'Cancel' : '+ Add New'}
              </button>
            </div>
            <input 
              type="text"
              value={beatSearch}
              onChange={(e) => setBeatSearch(e.target.value)}
              className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-1 focus:ring-[#E100FF]" 
              placeholder="Search beats..." 
            />
            <label className="block text-gray-400 text-xs mb-2">All categories</label>
            
            {/* Add New Beat Form */}
            {showAddBeat && (
              <div className="bg-[#232B43] rounded-lg p-4 mb-4 border border-[#E100FF]/30">
                <h4 className="text-white text-sm font-medium mb-3">Add New Beat Category</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Beat Category Name"
                    value={newBeatName}
                    onChange={(e) => setNewBeatName(e.target.value)}
                    className="w-full bg-[#181F36] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#E100FF]"
                  />
                  <input
                    type="text"
                    placeholder="Description (optional)"
                    value={newBeatDescription}
                    onChange={(e) => setNewBeatDescription(e.target.value)}
                    className="w-full bg-[#181F36] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#E100FF]"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleAddBeat}
                      disabled={!newBeatName.trim() || isAddingBeat}
                      className="flex-1 bg-[#E100FF] text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-[#c800d6] transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isAddingBeat ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Adding...</span>
                        </>
                      ) : (
                        'Add Beat'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddBeat(false);
                        setNewBeatName('');
                        setNewBeatDescription('');
                      }}
                      className="px-3 py-2 text-gray-400 text-sm hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="max-h-48 overflow-y-auto bg-[#181F36] rounded-lg border border-[#232B43] p-2">
              {filteredBeats.length === 0 ? (
                <div className="text-gray-400 text-sm text-center py-4">
                  {beatSearch ? 'No beats found matching your search' : 'No beats available'}
                </div>
              ) : (
                filteredBeats.map(beat => (
                <div key={beat._id} className="flex items-center gap-3 p-2 hover:bg-[#232B43] rounded cursor-pointer">
                  <input
                    type="checkbox"
                    id={`beat-${beat._id}`}
                    checked={selectedBeats.includes(beat._id)}
                    onChange={() => handleBeatToggle(beat._id)}
                    className="w-4 h-4 text-[#E100FF] bg-[#232B43] border-[#232B43] rounded focus:ring-[#E100FF] focus:ring-2"
                  />
                  <label htmlFor={`beat-${beat._id}`} className="text-white text-sm cursor-pointer flex-1">
                    {beat.name}
                  </label>
                </div>
                ))
              )}
            </div>
            {selectedBeats.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedBeats.map(beatId => {
                  const beat = beatsData.find(b => b._id === beatId);
                  return beat ? (
                    <span key={beatId} className="bg-[#E100FF]/20 text-[#E100FF] px-2 py-1 rounded-full text-xs">
                      {beat.name}
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </div>
          {/* Track Tags */}
          <div className="bg-[#101936] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <label className="block text-gray-300 mb-2">Track Tags</label>
              <button
                type="button"
                onClick={() => setShowAddTag(!showAddTag)}
                className="text-[#E100FF] text-sm hover:text-[#c800d6] transition-colors"
              >
                {showAddTag ? 'Cancel' : '+ Add New'}
              </button>
            </div>
            <input 
              type="text"
              value={tagSearch}
              onChange={(e) => setTagSearch(e.target.value)}
              className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 mb-2 focus:outline-none focus:ring-1 focus:ring-[#E100FF]" 
              placeholder="Search tags..." 
            />
            <label className="block text-gray-400 text-xs mb-2">All categories</label>
            
            {/* Add New Tag Form */}
            {showAddTag && (
              <div className="bg-[#232B43] rounded-lg p-4 mb-4 border border-[#E100FF]/30">
                <h4 className="text-white text-sm font-medium mb-3">Add New Tag</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Tag Name"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    className="w-full bg-[#181F36] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#E100FF]"
                  />
                  <input
                    type="text"
                    placeholder="Description (optional)"
                    value={newTagDescription}
                    onChange={(e) => setNewTagDescription(e.target.value)}
                    className="w-full bg-[#181F36] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#E100FF]"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleAddTag}
                      disabled={!newTagName.trim() || isAddingTag}
                      className="flex-1 bg-[#E100FF] text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-[#c800d6] transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isAddingTag ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Adding...</span>
                        </>
                      ) : (
                        'Add Tag'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddTag(false);
                        setNewTagName('');
                        setNewTagDescription('');
                      }}
                      className="px-3 py-2 text-gray-400 text-sm hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="max-h-48 overflow-y-auto bg-[#181F36] rounded-lg border border-[#232B43] p-2">
              {filteredTags.length === 0 ? (
                <div className="text-gray-400 text-sm text-center py-4">
                  {tagSearch ? 'No tags found matching your search' : 'No tags available'}
                </div>
              ) : (
                filteredTags.map(tag => (
                <div key={tag._id} className="flex items-center gap-3 p-2 hover:bg-[#232B43] rounded cursor-pointer">
                  <input
                    type="checkbox"
                    id={`tag-${tag._id}`}
                    checked={selectedTags.includes(tag._id)}
                    onChange={() => handleTagToggle(tag._id)}
                    className="w-4 h-4 text-[#E100FF] bg-[#232B43] border-[#232B43] rounded focus:ring-[#E100FF] focus:ring-2"
                  />
                  <label htmlFor={`tag-${tag._id}`} className="text-white text-sm cursor-pointer flex-1">
                    {tag.name}
                  </label>
                </div>
                ))
              )}
            </div>
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedTags.map(tagId => {
                  const tag = tagsData.find(t => t._id === tagId);
                  return tag ? (
                    <span key={tagId} className="bg-[#E100FF]/20 text-[#E100FF] px-2 py-1 rounded-full text-xs">
                      {tag.name}
                    </span>
                  ) : null;
                })}
              </div>
            )}
          </div>
          {/* SEO Setting */}
          <div className="bg-[#101936] rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <label className="block text-gray-300 mb-2">Seo Setting</label>
            <input 
              name="seoTitle"
              value={formData.seoTitle}
              onChange={handleInputChange}
              className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 mb-2" 
              placeholder="Seo Title" 
            />
            <input 
              name="metaKeyword"
              value={formData.metaKeyword}
              onChange={handleInputChange}
              className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 mb-2" 
              placeholder="Meta keyword" 
            />
            <input 
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleInputChange}
              className="w-full bg-[#181F36] text-white rounded-lg px-4 py-2 mb-2" 
              placeholder="Meta description" 
            />
          </div>
        </div>
      </form>
    </div>
  );
} 