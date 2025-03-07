import React, { useState } from 'react';
import { Search, Edit, MessageCircle, Plus } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const Employees = () => {
  const [activeContent, setActiveContent] = useState(' ');

  const [employees] = useState([
    {
      id: 1,
      name: "Employee",
      email: "",
      phone: "",
      role: "",
      status: true,
      avatar: "/api/placeholder/32/32"
    },
    {
      id: 2,
      name: "Employee",
      email: "",
      phone: "",
      role: "",
      status: true,
      avatar: "/api/placeholder/32/32"
    },
    {
      id: 3,
      name: "Demo Employee",
      email: "",
      phone: "",
      role: "",
      status: true,
      avatar: "/api/placeholder/32/32"
    }
  ]);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar setActiveContent={setActiveContent} />
        <div className="flex-1 p-4">
          {activeContent}
          <div className="p-6 max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Header Section */}
              <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm">👥</span>
                  </div>
                  <h2 className="text-lg font-medium">Employee Table</h2>
                  <span className="bg-gray-100 px-2 py-1 rounded text-sm">3</span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-grow sm:flex-grow-0">
                    <input
                      type="text"
                      placeholder="Search by name or email"
                      className="w-full sm:w-64 pl-3 pr-10 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Search className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  <select className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All</option>
                  </select>

                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 whitespace-nowrap">
                    Filter
                  </button>

                  <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50">
                    Export
                  </button>

                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <span>Add new</span>
                  </button>
                </div>
              </div>

              {/* Table Section */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-4 font-medium">SL</th>
                      <th className="text-left p-4 font-medium">Name</th>
                      <th className="text-left p-4 font-medium">Email</th>
                      <th className="text-left p-4 font-medium">Phone</th>
                      <th className="text-left p-4 font-medium">Role</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.id} className="border-t">
                        <td className="p-4">{employee.id}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={employee.avatar}
                              alt={employee.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <span>{employee.name}</span>
                          </div>
                        </td>
                        <td className="p-4">{employee.email}</td>
                        <td className="p-4">{employee.phone}</td>
                        <td className="p-4">{employee.role}</td>
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
                            <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                              <MessageCircle className="w-4 h-4" />
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

export default Employees;