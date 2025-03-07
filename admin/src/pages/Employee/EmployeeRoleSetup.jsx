import React, { useState } from 'react';
import { Search, Edit, Trash2 } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';


const EmployeeRoleSetup = () => {
  const [selectAll, setSelectAll] = useState(false);

  const [activeContent, setActiveContent] = useState(' ');
  const [permissions, setPermissions] = useState({
    dashboard: false,
    productManagement: false,
    userManagement: false,
    posManagement: false,
    promotionManagement: false,
    systemSettings: false,
    blogManagement: false,
    helpSupport: false,
    orderManagement: false,
    reportsAnalytics: false
  });

  const [roles] = useState([
    {
      id: 1,
      name: 'role',
      modules: ['Product Management', 'Marketing Section', 'Business Section'],
      createdAt: '21-Apr-22',
      status: true
    },
    {
      id: 2,
      name: 'product manager',
      modules: ['Order Management', 'Product Management', 'Marketing Section'],
      createdAt: '21-Mar-22',
      status: true
    }
  ]);

  const handleSelectAll = () => {
    const newValue = !selectAll;
    setSelectAll(newValue);
    const updatedPermissions = {};
    Object.keys(permissions).forEach(key => {
      updatedPermissions[key] = newValue;
    });
    setPermissions(updatedPermissions);
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="p-6 max-w-7xl mx-auto">
            {/* Role Setup Form */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">👤</span>
                </div>
                <h1 className="text-xl font-medium">Employee Role Setup</h1>
              </div>

              <div className="mb-6">
                <label className="block text-sm mb-2">Role Name</label>
                <input
                  type="text"
                  placeholder="Ex: Store"
                  className="w-full max-w-md p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <label className="text-sm">Module Permission</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm">Select All</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(permissions).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => setPermissions(prev => ({ ...prev, [key]: !prev[key] }))}
                        className="rounded text-blue-600"
                      />
                      <span className="text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Submit
                </button>
              </div>
            </div>

            {/* Roles List */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-medium">Employee Roles</h2>
                  <span className="bg-gray-100 px-2 py-1 rounded text-sm">2</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="relative flex-grow sm:flex-grow-0">
                    <input
                      type="text"
                      placeholder="Search role"
                      className="w-full sm:w-64 pl-3 pr-10 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Search className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
                    Export
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4 font-medium">SL</th>
                      <th className="text-left p-4 font-medium">Role Name</th>
                      <th className="text-left p-4 font-medium">Modules</th>
                      <th className="text-left p-4 font-medium">Created At</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((role) => (
                      <tr key={role.id} className="border-t">
                        <td className="p-4">{role.id}</td>
                        <td className="p-4">{role.name}</td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {role.modules.map((module, idx) => (
                              <span key={idx} className="bg-blue-50 text-blue-600 text-sm px-2 py-1 rounded">
                                {module}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-4">{role.createdAt}</td>
                        <td className="p-4">
                          <div className="w-12 h-6 bg-blue-100 rounded-full relative cursor-pointer">
                            <div className="w-4 h-4 bg-blue-600 rounded-full absolute top-1 right-1"></div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRoleSetup;