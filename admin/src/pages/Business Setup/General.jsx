import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import config from '../../config';

const General = () => {
  const [settings, setSettings] = useState({
    maintenance_mode: false,
    company_name: '',
    phone: '',
    email: '',
    country: '',
    timezone: '',
    language: 'English (En)',
    address: '',
    latitude: '',
    longitude: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const googleMapRef = useRef(null);

  // Fetch settings on component mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          fetchSettings(),
          fetchLocationInfo()
        ]);
        loadGoogleMapsScript();
      } catch (err) {
        console.error('Error initializing data:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  const loadGoogleMapsScript = () => {
    if (window.google && window.google.maps) {
      initializeMap();
      return;
    }
    
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${config.googleMapsApiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);
  };

  const initializeMap = () => {
    if (!googleMapRef.current && mapRef.current) {
      // Default to center of map if no coordinates are set
      const defaultLat = settings.latitude && settings.latitude.trim() !== '' ? parseFloat(settings.latitude) : 40.751;
      const defaultLng = settings.longitude && settings.longitude.trim() !== '' ? parseFloat(settings.longitude) : -73.983;
      const defaultLocation = { lat: defaultLat, lng: defaultLng };
      
      const mapOptions = {
        center: defaultLocation,
        zoom: 13,
        mapTypeControl: true,
      };

      googleMapRef.current = new window.google.maps.Map(mapRef.current, mapOptions);
      
      markerRef.current = new window.google.maps.Marker({
        position: defaultLocation,
        map: googleMapRef.current,
        draggable: true,
        title: 'Company Location'
      });

      // Add search box
      const input = document.getElementById('address-input');
      const searchBox = new window.google.maps.places.SearchBox(input);

      // Bias search results to the current map's viewport
      googleMapRef.current.addListener('bounds_changed', () => {
        searchBox.setBounds(googleMapRef.current.getBounds());
      });

      // Listen for search results
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();

        if (places.length === 0) return;

        const place = places[0];
        if (!place.geometry || !place.geometry.location) return;

        // Update marker and map
        googleMapRef.current.setCenter(place.geometry.location);
        markerRef.current.setPosition(place.geometry.location);

        // Update state with new location data
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        
        setSettings(prev => ({
          ...prev,
          address: place.formatted_address || input.value,
          latitude: lat.toString(),
          longitude: lng.toString()
        }));
      });

      // Update lat/lng when marker is dragged
      markerRef.current.addListener('dragend', async () => {
        const position = markerRef.current.getPosition();
        const lat = position.lat();
        const lng = position.lng();
        
        setSettings(prev => ({
          ...prev,
          latitude: lat.toString(),
          longitude: lng.toString()
        }));

        // Reverse geocode to get address
        try {
          const geocoder = new window.google.maps.Geocoder();
          const response = await new Promise((resolve, reject) => {
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
              if (status === 'OK' && results[0]) {
                resolve(results);
              } else {
                reject(new Error(`Geocoding failed with status: ${status}`));
              }
            });
          });
          
          setSettings(prev => ({
            ...prev,
            address: response[0].formatted_address
          }));
        } catch (err) {
          console.error('Error in reverse geocoding:', err);
        }
      });
    }
  };

  // Update map when settings change
  useEffect(() => {
    // Update map and marker when lat/lng change and map is initialized
    if (googleMapRef.current && markerRef.current && settings.latitude && settings.longitude) {
      try {
        const lat = parseFloat(settings.latitude);
        const lng = parseFloat(settings.longitude);
        
        if (!isNaN(lat) && !isNaN(lng)) {
          const position = new window.google.maps.LatLng(lat, lng);
          markerRef.current.setPosition(position);
          googleMapRef.current.setCenter(position);
        }
      } catch (err) {
        console.error('Error updating map position:', err);
      }
    }
  }, [settings.latitude, settings.longitude]);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/general_settings`);
      setSettings((prev) => ({ ...prev, ...response.data }));
      setError(null);
      return response.data;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.log('No settings found, using default values');
      } else {
        setError('Failed to load settings');
        console.error('Error fetching settings:', err);
      }
      throw err;
    }
  };

  const fetchLocationInfo = async () => {
    try {
      const response = await axios.get('https://ipapi.co/json/');
      const { country_name, timezone } = response.data;

      setSettings((prev) => ({
        ...prev,
        country: prev.country || country_name,
        timezone: prev.timezone || timezone,
      }));
      
      return response.data;
    } catch (err) {
      console.error('Error fetching location info:', err);
      throw err;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleMaintenanceMode = () => {
    setSettings((prev) => ({
      ...prev,
      maintenance_mode: !prev.maintenance_mode
    }));
  };

  const saveSettings = async () => {
    try {
      setSaveStatus('Saving...');
      let endpoint;
      let method;
      
      try {
        // Try to get existing settings first
        await axios.get(`${config.apiUrl}/general_settings`);
        endpoint = `${config.apiUrl}/update_settings`;
        method = 'put';
      } catch (err) {
        // If 404, create new settings
        if (err.response && err.response.status === 404) {
          endpoint = `${config.apiUrl}/customer_settings`;
          method = 'post';
        } else {
          // For other errors, rethrow
          throw err;
        }
      }
      
      const response = await axios[method](endpoint, settings);
      setSaveStatus('Settings saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
      return response.data;
    } catch (err) {
      setSaveStatus('Error saving settings');
      console.error('Error saving settings:', err);
      throw err;
    }
  };

  return (
    <div>
      {/* System Maintenance Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">System Maintenance</h2>
            <p className="mt-1 text-sm text-gray-500">
              By turning on maintenance mode Control your all system & function
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Maintenance Mode</span>
            <button
              onClick={toggleMaintenanceMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.maintenance_mode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.maintenance_mode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Company Information Form */}
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Company Information</h2>
        {loading ? (
          <div className="text-center py-4">Loading settings...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  name="company_name"
                  value={settings.company_name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="6valley CMS"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={settings.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="+00xxxxxxxxxxxx"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="copy@6amtech.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  name="country"
                  value={settings.country}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Country"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time Zone</label>
                <input
                  type="text"
                  name="timezone"
                  value={settings.timezone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Time Zone"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Language</label>
                <select 
                  name="language"
                  value={settings.language}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option>English (En)</option>
                  <option>Spanish (Es)</option>
                  <option>French (Fr)</option>
                </select>
              </div>
            </div>

            {/* Address Search with Map */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Address</label>
              <input
                id="address-input"
                type="text"
                name="address"
                value={settings.address}
                onChange={handleInputChange}
                className="mb-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Search for address or drag marker on map"
              />
            </div>

            {/* Map Container */}
            <div className="mt-2 mb-4">
              <div 
                ref={mapRef} 
                className="h-64 w-full rounded-lg border border-gray-300"
              ></div>
              <p className="mt-2 text-sm text-gray-500">
                Drag the marker or search for an address to set your company location
              </p>
            </div>

            {/* Coordinates */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Latitude</label>
                <input
                  type="text"
                  name="latitude"
                  value={settings.latitude}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="21.7679"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Longitude</label>
                <input
                  type="text"
                  name="longitude"
                  value={settings.longitude}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="78.8718"
                />
              </div>
            </div>

            {/* Save Button and Status */}
            <div className="mt-6 flex items-center justify-end">
              {saveStatus && (
                <span className={`mr-4 text-sm ${saveStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                  {saveStatus}
                </span>
              )}
              <button
                onClick={async () => {
                  try {
                    await saveSettings();
                  } catch (err) {
                    // Error is already handled in saveSettings
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Settings
              </button>
            </div>
          </>
        )}
        
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default General;