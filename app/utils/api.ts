import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

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
    const response = await api.delete(`/sound-kit-tags/${id}`);
    return response.data;
  },
};

export default api;
