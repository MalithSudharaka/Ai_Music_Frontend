import axios from 'axios';

const API_BASE_URL = 'https://ai-music-backend-73mf.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/user/pages/SignIn';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  signup: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    const response = await api.post('/signup', userData);
    return response.data;
  },
  
  signin: async (credentials: {
    email: string;
    password: string;
  }) => {
    const response = await api.post('/signin', credentials);
    return response.data;
  },
};

export const profileAPI = {
  updateProfile: async (userId: string, profileData: {
    firstName: string;
    lastName: string;
    displayName: string;
    location: string;
    country: string;
    biography: string;
    profilePicture?: string;
    socialLinks: {
      facebook: string;
      twitter: string;
      instagram: string;
      youtube: string;
      linkedin: string;
      website: string;
    };
  }) => {
    const response = await api.put(`/profile/${userId}`, profileData);
    return response.data;
  },
};

export const userAPI = {
  getUsers: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  createUser: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    username?: string;
    password: string;
    phone?: string;
  }) => {
    const response = await api.post('/users', userData);
    return response.data;
  },

  updateUser: async (id: string, userData: {
    firstName?: string;
    lastName?: string;
    email?: string;
    displayName?: string;
    location?: string;
    country?: string;
    biography?: string;
  }) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

export const trackAPI = {
  createTrack: async (trackData: {
    trackName: string;
    trackId: string;
    bpm?: number;
    trackKey?: string;
    trackPrice?: number;
    musician?: string;
    trackType: string;
    moodType?: string;
    energyType?: string;
    instrument?: string;
    generatedTrackPlatform?: string;
    trackImage?: string;
    trackFile?: string;
    about?: string;
    publish?: string;
    genreCategory?: string | string[];
    beatCategory?: string | string[];
    trackTags?: string | string[];
    seoTitle?: string;
    metaKeyword?: string;
    metaDescription?: string;
  }) => {
    const response = await api.post('/tracks', trackData);
    return response.data;
  },

  getTracks: async () => {
    const response = await api.get('/tracks');
    return response.data;
  },

  updateTrack: async (id: string, trackData: {
    trackName?: string;
    trackId?: string;
    bpm?: number;
    trackKey?: string;
    trackPrice?: number;
    musician?: string;
    trackType?: string;
    moodType?: string;
    energyType?: string;
    instrument?: string;
    generatedTrackPlatform?: string;
    trackImage?: string;
    trackFile?: string;
    about?: string;
    publish?: string;
    genreCategory?: string | string[];
    beatCategory?: string | string[];
    trackTags?: string | string[];
    seoTitle?: string;
    metaKeyword?: string;
    metaDescription?: string;
  }) => {
    const response = await api.put(`/tracks/${id}`, trackData);
    return response.data;
  },

  deleteTrack: async (id: string) => {
    const response = await api.delete(`/tracks/${id}`);
    return response.data;
  },

  getUniqueMusicians: async () => {
    const response = await api.get('/tracks');
    if (response.data?.success && response.data.tracks) {
      const musicians = response.data.tracks
        .map((track: any) => track.musician)
        .filter((musician: string) => musician && musician.trim() !== '')
        .filter((musician: string, index: number, arr: string[]) => arr.indexOf(musician) === index)
        .sort();
      return { success: true, musicians };
    }
    return { success: false, musicians: [] };
  },

  getMusiciansWithProfiles: async () => {
    const response = await api.get('/musicians');
    if (response.data?.success) {
      return { success: true, musicians: response.data.musicians };
    }
    return { success: false, musicians: [] };
  },
};

export const genreAPI = {
  createGenre: async (genreData: {
    name: string;
    description?: string;
    color?: string;
  }) => {
    const response = await api.post('/genres', genreData);
    return response.data;
  },

  getGenres: async () => {
    const response = await api.get('/genres');
    return response.data;
  },

  updateGenre: async (id: string, genreData: {
    name?: string;
    description?: string;
    color?: string;
    isActive?: boolean;
  }) => {
    const response = await api.put(`/genres/${id}`, genreData);
    return response.data;
  },

  deleteGenre: async (id: string) => {
    const response = await api.delete(`/genres/${id}`);
    return response.data;
  },
};

export const beatAPI = {
  createBeat: async (beatData: {
    name: string;
    description?: string;
    color?: string;
  }) => {
    const response = await api.post('/beats', beatData);
    return response.data;
  },

  getBeats: async () => {
    const response = await api.get('/beats');
    return response.data;
  },

  updateBeat: async (id: string, beatData: {
    name?: string;
    description?: string;
    color?: string;
    isActive?: boolean;
  }) => {
    const response = await api.put(`/beats/${id}`, beatData);
    return response.data;
  },

  deleteBeat: async (id: string) => {
    const response = await api.delete(`/beats/${id}`);
    return response.data;
  },
};

export const tagAPI = {
  createTag: async (tagData: {
    name: string;
    description?: string;
    color?: string;
  }) => {
    const response = await api.post('/tags', tagData);
    return response.data;
  },

  getTags: async () => {
    const response = await api.get('/tags');
    return response.data;
  },

  updateTag: async (id: string, tagData: {
    name?: string;
    description?: string;
    color?: string;
    isActive?: boolean;
  }) => {
    const response = await api.put(`/tags/${id}`, tagData);
    return response.data;
  },

  deleteTag: async (id: string) => {
    const response = await api.delete(`/tags/${id}`);
    return response.data;
  },
};

export const soundKitAPI = {
  createSoundKit: async (soundKitData: {
    kitName: string;
    kitId: string;
    description?: string;
    category?: string;
    price?: number;
    producer?: string;
    kitType?: string;
    bpm?: number;
    key?: string;
    kitImage?: string;
    kitFile?: string;
    tags?: string[];
    publish?: string;
    seoTitle?: string;
    metaKeyword?: string;
    metaDescription?: string;
  }) => {
    const response = await api.post('/sound-kits', soundKitData);
    return response.data;
  },

  getSoundKits: async () => {
    const response = await api.get('/sound-kits');
    return response.data;
  },

  updateSoundKit: async (id: string, soundKitData: {
    kitName?: string;
    kitId?: string;
    description?: string;
    category?: string;
    price?: number;
    producer?: string;
    kitType?: string;
    bpm?: number;
    key?: string;
    kitImage?: string;
    kitFile?: string;
    tags?: string[];
    publish?: string;
    seoTitle?: string;
    metaKeyword?: string;
    metaDescription?: string;
  }) => {
    const response = await api.put(`/sound-kits/${id}`, soundKitData);
    return response.data;
  },

  deleteSoundKit: async (id: string) => {
    const response = await api.delete(`/sound-kits/${id}`);
    return response.data;
  },
};

export const soundKitCategoryAPI = {
  createCategory: async (categoryData: {
    name: string;
    description?: string;
    color?: string;
  }) => {
    const response = await api.post('/sound-kit-categories', categoryData);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/sound-kit-categories');
    return response.data;
  },

  updateCategory: async (id: string, categoryData: {
    name?: string;
    description?: string;
    color?: string;
    isActive?: boolean;
  }) => {
    const response = await api.put(`/sound-kit-categories/${id}`, categoryData);
    return response.data;
  },

  deleteCategory: async (id: string) => {
    const response = await api.delete(`/sound-kit-categories/${id}`);
    return response.data;
  },
};

export const soundKitTagAPI = {
  createTag: async (tagData: {
    name: string;
    description?: string;
    color?: string;
  }) => {
    const response = await api.post('/sound-kit-tags', tagData);
    return response.data;
  },

  getTags: async () => {
    const response = await api.get('/sound-kit-tags');
    return response.data;
  },

  updateTag: async (id: string, tagData: {
    name?: string;
    description?: string;
    color?: string;
    isActive?: boolean;
  }) => {
    const response = await api.put(`/sound-kit-tags/${id}`, tagData);
    return response.data;
  },

  deleteTag: async (id: string) => {
    console.log('API: Deleting sound kit tag with ID:', id);
    console.log('API: Making DELETE request to:', `/sound-kit-tags/${id}`);
    const response = await api.delete(`/sound-kit-tags/${id}`);
    console.log('API: Delete response:', response.data);
    return response.data;
  },
};

export const imageAPI = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await api.post('/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getImage: (fileId: string) => {
    return `${API_BASE_URL}/image/${fileId}`;
  },

  deleteImage: async (fileId: string) => {
    const response = await api.delete(`/image/${fileId}`);
    return response.data;
  },

  listImages: async () => {
    const response = await api.get('/images');
    return response.data;
  },
};

export const musicianAPI = {
  getMusicians: async () => {
    const response = await api.get('/musicians');
    return response.data;
  },

  getMusician: async (id: string) => {
    const response = await api.get(`/musicians/${id}`);
    return response.data;
  },

  createMusician: async (musicianData: {
    name: string;
    profilePicture?: string;
    bio?: string;
    country?: string;
    genre?: string;
    socialLinks?: Record<string, string>;
    isActive?: boolean;
  }) => {
    const response = await api.post('/musicians', musicianData);
    return response.data;
  },

  updateMusician: async (id: string, musicianData: {
    name?: string;
    profilePicture?: string;
    bio?: string;
    country?: string;
    genre?: string;
    socialLinks?: Record<string, string>;
    isActive?: boolean;
  }) => {
    const response = await api.put(`/musicians/${id}`, musicianData);
    return response.data;
  },

  deleteMusician: async (id: string) => {
    const response = await api.delete(`/musicians/${id}`);
    return response.data;
  },

  searchMusicians: async (query: string) => {
    const response = await api.get(`/musicians/search/${query}`);
    return response.data;
  },

  syncMusicians: async () => {
    const response = await api.post('/musicians/sync');
    return response.data;
  },
};

export default api;
