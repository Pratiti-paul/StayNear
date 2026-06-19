import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5002/api",
});

// Add interceptor to append authorization token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Property APIs
export const getProperties = (params) => API.get("/properties", { params });
export const getPropertyById = (id) => API.get(`/properties/${id}`);
export const createProperty = (formData) =>
  API.post("/properties", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateProperty = (id, formData) =>
  API.put(`/properties/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteProperty = (id) => API.delete(`/properties/${id}`);

// Admin Moderation APIs
export const verifyProperty = (id, verified) =>
  API.put(`/properties/${id}/verify`, { verified });
export const featureProperty = (id, featured) =>
  API.put(`/properties/${id}/feature`, { featured });

// Wishlist APIs
export const getWishlist = () => API.get("/wishlist");
export const addToWishlist = (propertyId) =>
  API.post("/wishlist/add", { propertyId });
export const removeFromWishlist = (propertyId) =>
  API.delete(`/wishlist/${propertyId}`);

// Inquiry APIs
export const getInquiries = () => API.get("/inquiries");
export const createInquiry = (inquiryData) => API.post("/inquiries", inquiryData);
export const updateInquiryStatus = (id, status) =>
  API.patch(`/inquiries/${id}`, { status });
