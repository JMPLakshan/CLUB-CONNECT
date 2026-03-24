import { Users, CalendarDays, Trophy, BookOpen, ArrowRight } from "lucide-react";

function Home() {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: "Join Student Clubs",
      description:
        "Discover societies and communities that match your interests, from tech and sports to arts and volunteering.",
    },
    {
      icon: <CalendarDays className="w-8 h-8 text-indigo-600" />,
      title: "Explore Events",
      description:
        "Stay updated with workshops, competitions, seminars, and campus activities happening around you.",
    },
    {
      icon: <Trophy className="w-8 h-8 text-indigo-600" />,
      title: "Showcase Achievements",
      description:
        "Celebrate student success by highlighting awards, competitions, and milestones.",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-indigo-600" />,
      title: "Learn & Connect",
      description:
        "Build friendships, improve skills, and create meaningful connections within the campus community.",
    },
  ];

  const clubs = [
    {
      name: "Coding Club",
      desc: "Build projects, join hackathons, and improve your development skills.",
    },
    {
      name: "Art Society",
      desc: "Express creativity through design, drawing, painting, and exhibitions.",
    },
    {
      name: "Sports Club",
      desc: "Participate in tournaments, training sessions, and fitness activities.",
    },
  ];

  return (
    <main className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="inline-block bg-white/20 text-sm px-4 py-1 rounded-full mb-4">
              Welcome to Campus Society
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Connect, Explore, and Grow with Campus Communities
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
              Find clubs, join events, and become part of a vibrant student
              network designed to make campus life more exciting and meaningful.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-100 transition">
                Explore Clubs
              </button>
              <button className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-indigo-700 transition">
                View Events
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-2xl">
              <img
                src="https://i.ytimg.com/vi/9FqQrf9aAGU/maxresdefault.jpg"
                alt="Students on campus"
                className="rounded-2xl w-full h-[350px] object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white text-gray-800 rounded-2xl shadow-xl px-5 py-4 w-52">
              <h3 className="text-2xl font-bold text-indigo-700">50+</h3>
              <p className="text-sm text-gray-600">Active student clubs</p>
            </div>

            <div className="absolute -top-6 -right-6 bg-white text-gray-800 rounded-2xl shadow-xl px-5 py-4 w-52">
              <h3 className="text-2xl font-bold text-indigo-700">120+</h3>
              <p className="text-sm text-gray-600">Events every semester</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Students Love Campus Society
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything students need to engage with campus life in one place.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-6">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Clubs */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Popular Student Clubs
              </h2>
              <p className="text-gray-600">
                Discover some of the most active communities on campus.
              </p>
            </div>

            <button className="mt-4 md:mt-0 inline-flex items-center gap-2 text-indigo-700 font-semibold hover:gap-3 transition-all">
              View All Clubs <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {clubs.map((club, index) => (
              <div
                key={index}
                className="rounded-3xl bg-gradient-to-br from-indigo-50 to-blue-50 p-8 border border-indigo-100 hover:shadow-lg transition"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-indigo-600 text-white text-xl font-bold mb-5">
                  {club.name.charAt(0)}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{club.name}</h3>
                <p className="text-gray-600 mb-6">{club.desc}</p>
                <button className="text-indigo-700 font-medium hover:underline">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="bg-gradient-to-r from-indigo-700 to-blue-700 rounded-3xl p-10 md:p-16 text-white text-center shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to start your campus journey?
            </h2>
            <p className="text-gray-200 max-w-2xl mx-auto mb-8">
              Join clubs, participate in events, and connect with fellow students
              through one beautiful platform.
            </p>
            <button className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition">
              Get Started
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;