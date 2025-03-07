import React, { useState } from 'react';
import { Mail, MessageSquare, Map, Database, Key, Facebook, Apple, Send } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';



const OtherConfiguration = () => {
  const [activeTab, setActiveTab] = useState('social-media-chat');
  const [activeContent, setActiveContent] = useState(' ');

  const tabs = [
    { id: 'social-media-chat', label: 'Social Media Chat', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'social-media-login', label: 'Social Media Login', icon: <Facebook className="w-4 h-4" /> },
    { id: 'mail-config', label: 'Mail Config', icon: <Mail className="w-4 h-4" /> },
    { id: 'sms-config', label: 'SMS Config', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'recaptcha', label: 'Recaptcha', icon: <Key className="w-4 h-4" /> },
    { id: 'google-map-apis', label: 'Google Map APIs', icon: <Map className="w-4 h-4" /> },
    { id: 'storage-connection', label: 'Storage Connection', icon: <Database className="w-4 h-4" /> },
    { id: 'firebase-auth', label: 'Firebase Auth', icon: <Key className="w-4 h-4" /> }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'social-media-chat':
        return (

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium">WhatsApp Configuration</h2>
              <div className="relative">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="00000000000" />
              </div>
            </div>
          </div>
        );

      case 'mail-config':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <div className="flex space-x-4">
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
                    Mail configuration
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                    Send test mail
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">SMTP Mail Config</h3>
                      <div className="relative">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Mailer Name</label>
                        <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ex:Alex" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Host</label>
                        <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ex: Smtp.mailtrap.io" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Port</label>
                        <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ex:587" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ex: yahoo" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ex:123456" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">Sendgrid Mail Config</h3>
                      <div className="relative">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600"></div>
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {/* Mirror of SMTP fields */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Mailer Name</label>
                        <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ex:Alex" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Host</label>
                        <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ex: Smtp.mailtrap.io" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'sms-config':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-4 text-sm text-gray-600">
                NB: Please re check if you have put all the data correctly or contact your SMS gateway provider for assistance.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">2FACTOR</h3>
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Api Key</label>
                    <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Api Key" />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">MSG91</h3>
                    <div className="relative">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600"></div>
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Template ID</label>
                    <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Template ID" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Auth Key</label>
                    <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Auth Key" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'google-map-apis':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium">Google Map API Setup</h2>
              <div className="relative">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
              </div>
            </div>
            <div className="mb-4 text-sm text-gray-600">
              NB: Client key should have enable map javascript api and you can restrict it with http refer Server key should have enable place api key and you can restrict it with ip You can use same api for both field without any restrictions.
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Map Api Key(Client)</label>
                <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Map api key(Client)" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Map Api Key(Server)</label>
                <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Map api key(Server)" />
              </div>
            </div>
          </div>
        );

      case 'storage-connection':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Storage Connection Settings</h3>
              </div>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <input type="radio" name="storage" id="local" className="text-blue-600" />
                  <label htmlFor="local" className="text-sm font-medium text-gray-700">Local System</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" name="storage" id="s3" className="text-blue-600" />
                  <label htmlFor="s3" className="text-sm font-medium text-gray-700">3rd Party Storage</label>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Access Key</label>
                  <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter your access key" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Secret Access Key</label>
                  <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter your secret access key" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Region</label>
                  <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter your region" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bucket</label>
                  <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter your bucket" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'social-media-login':
        return (
          <div className="space-y-6">
            {/* Google Login */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Google Login</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Callback URL</label>
                  <input
                    type="text"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    value="https://valley.5amtech.com/customer/auth/login/google/callback"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Store Client ID</label>
                  <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ex:Client ID" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Store Client Secret Key</label>
                  <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ex:Client secret key" />
                </div>
                <div className="flex justify-end space-x-3">
                  <button className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">Reset</button>
                  <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">Save</button>
                </div>
              </div>
            </div>

            {/* Facebook Login */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Facebook Login</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Callback URL</label>
                  <input
                    type="text"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                    value="https://valley.5amtech.com/customer/auth/login/facebook/callback"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Store Client ID</label>
                  <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ex:Client ID" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Store Client Secret Key</label>
                  <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ex:Client secret key" />
                </div>
                <div className="flex justify-end space-x-3">
                  <button className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">Reset</button>
                  <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">Save</button>
                </div>
              </div>
            </div>

            {/* Apple Login */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium mb-4">Apple Login</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Client Id</label>
                  <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ex:Client ID" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Team Id</label>
                  <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ex:Team id" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Key Id</label>
                  <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Ex:Key ID" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Key File</label>
                  <div className="mt-1 flex items-center space-x-2">
                    <button className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                      Choose File
                    </button>
                    <span className="text-sm text-gray-500">No file chosen</span>
                  </div>
                </div>
                <div className="flex justify-end space-x-3">
                  <button className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">Reset</button>
                  <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">Save</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'firebase-auth':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Please ensure that your firebase configuration is set up before using these features.
                <a href="#" className="text-blue-600 hover:text-blue-700 ml-1">Check Firebase Configuration</a>
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Web Api Key</label>
                <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Enter api key" />
              </div>
              <div className="flex justify-end space-x-3">
                <button className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">Reset</button>
                <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">Save</button>
              </div>
            </div>
          </div>
        );

      case 'recaptcha':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Status</h2>
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" id="recaptcha-toggle" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Site Key</label>
                <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Site Key" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Secret Key</label>
                <input type="text" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="Secret Key" />
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Instructions</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                  <li>To get site key and secret key Go to the Credentials page (Click here)</li>
                  <li>Add a label (Ex: abc company)</li>
                  <li>Select reCAPTCHA v2 as ReCAPTCHA Type</li>
                  <li>Select sub type:Im not a robot checkbox</li>
                  <li>Add Domain (For ex: demo.6amtech.com)</li>
                  <li>Check in Accept the reCAPTCHA Terms of Service</li>
                  <li>Press Submit</li>
                  <li>Copy Site Key and Secret Key Paste in the input filed below and Save.</li>
                </ol>
              </div>
              <div className="flex justify-end space-x-3">
                <button className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200">Reset</button>
                <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">Save</button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
              <div className="px-4 py-3 flex items-center">
                <Apple className="w-6 h-6 text-gray-600" />
                <h1 className="ml-2 text-xl font-semibold text-gray-800">Other Configuration</h1>
              </div>
            </header>

            {/* Navigation */}
            <nav className="w-full overflow-x-auto border-b border-gray-200 bg-white">
              <div className="flex space-x-1 p-2 min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-2 rounded-md text-sm transition-colors
                  ${activeTab === tab.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    {tab.icon}
                    <span className="ml-2">{tab.label}</span>
                  </button>
                ))}
              </div>
            </nav>

            {/* Main Content */}
            <main className="p-6">
              <div className="max-w-7xl mx-auto">
                {renderContent()}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherConfiguration;