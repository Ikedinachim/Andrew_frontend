import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold">Hi username, I’m proud of you for showing up today! Ready to learn?</h1>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">+ Add New Course</button>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* On Track Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">On Track</h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-bold">Python for Data Science</h3>
                <p className="text-gray-600 mt-2">
                  Learn how to analyze, visualize, and manipulate data using Python libraries like Pandas, NumPy, and Matplotlib, along with machine learning techniques...
                </p>
                <div className="mt-4">
                  <span className="text-sm text-gray-500">3 of 8 modules | 4 weeks left</span>
                  <div className="mt-2">
                    <span className="text-sm font-semibold">Course Grade-</span>
                    <button className="ml-4 bg-green-500 text-white px-4 py-2 rounded">Resume Course</button>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">Next Module: Fundamental of Python</p>
                </div>
              </div>
            </section>

            {/* New Courses Section */}
            <section>
              <h2 className="text-xl font-semibold mb-4">New</h2>
              <div className="space-y-4">
                {/* Cybersecurity Course */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-bold">Cybersecurity & Ethical Hacking</h3>
                  <p className="text-gray-600 mt-2">
                    Gain expertise in securing networks, systems, and applications by understanding vulnerabilities, penetration testing, and ethical hacking techniques...
                  </p>
                  <div className="mt-4">
                    <span className="text-sm text-gray-500">15 modules | 6 weeks</span>
                    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Learn more</button>
                  </div>
                </div>

                {/* UX Design Course */}
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-bold">UX Design & Usability Principles</h3>
                  <p className="text-gray-600 mt-2">
                    Learn the fundamentals of user experience (UX) design, including research, wireframing, prototyping, and usability testing, to create intuitive and user-friendly designs...
                  </p>
                  <div className="mt-4">
                    <span className="text-sm text-gray-500">10 modules | 6 weeks</span>
                    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Learn more</button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            {/* Recent Activities */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <ul className="space-y-4">
                  <li className="text-sm text-gray-600">You have scored 40% in Quiz XYZ - 2 days ago</li>
                  <li className="text-sm text-gray-600">New course ABC created - 7 days ago</li>
                  <li className="text-sm text-gray-600">Completed module MNP - 7 days ago</li>
                  <li className="text-sm text-gray-600">40% improvement in module 234 - 15 days ago</li>
                </ul>
              </div>
            </section>

            {/* Day Streak */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Day Streak</h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>
                <p className="mt-4 text-sm text-gray-600">Your best streak is 5 days</p>
              </div>
            </section>

            {/* Recommendations */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Recommendation</h2>
              <div className="bg-white p-6 rounded-lg shadow">
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Complete module X for course XYZ</li>
                  <li>Study material BAG for better understanding</li>
                  <li>Take 2 more quizzes to master Introduction to Python</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;