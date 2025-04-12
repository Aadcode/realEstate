"use client";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AgentsHeader from "../../components/Agents/AgentsHeader";
import AgentCard from "../../components/Agents/AgentCard";
import AgentsPagination from "../../components/Agents/AgentsPagination";

const AgentsPage = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/users");
        if (!response.ok) {
          throw new Error("Failed to fetch agents");
        }
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          // Filter users to only show agents and include avatar
          const agentUsers = data.data
            .filter(user => user.role === 'AGENT')
            .map(agent => ({
              ...agent,
              avatar: agent.avatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&auto=format&fit=crop&q=60"
            }));
          setAgents(agentUsers);
        } else {
          setAgents([]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center w-full min-h-screen px-4 py-6">
        <div className="w-full max-w-[1440px]">
          {/* Agents Header */}
          <AgentsHeader />

          {/* Agents List */}
          <div className="w-full bg-white rounded-lg p-6 shadow-md">
            {loading ? (
              <p className="text-center text-gray-500">Loading agents...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : agents.length === 0 ? (
              <p className="text-center text-gray-500">No agents found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {agents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {agents.length > 0 && (
            <div className="mt-8 flex justify-center">
              <AgentsPagination />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AgentsPage;
