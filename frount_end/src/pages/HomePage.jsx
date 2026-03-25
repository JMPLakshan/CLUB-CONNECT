import { Users, CalendarDays, Trophy, BookOpen, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/common/Footer";
import Button from "../components/common/Button";

function Home() {
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const userInfo = localStorage.getItem("userInfo");
  let parsedUser = null;
  try {
    parsedUser = userInfo ? JSON.parse(userInfo) : null;
  } catch {
    parsedUser = null;
  }
  const isLoggedInUser = parsedUser?.role === "user";
  const profileImage = parsedUser?.profilePhoto ? `${API_BASE_URL}${parsedUser.profilePhoto}` : "";

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

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
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-700 shadow-lg backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="text-white">
            <h1 className="text-xl font-bold tracking-wide md:text-2xl">Campus Society</h1>
            <p className="text-xs text-blue-100">Connect. Learn. Grow.</p>
          </div>
          <ul className="hidden items-center gap-3 md:flex">
            <li>
              <button
                onClick={() => navigate("/home")}
                className="rounded-lg px-4 py-2 text-sm font-medium text-blue-100 transition hover:bg-white/10 hover:text-white"
              >
                Home
              </button>
            </li>
            {isLoggedInUser ? (
              <>
                <li className="px-2 text-sm font-medium text-blue-100">Welcome, {parsedUser.name}</li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-indigo-800"
                  >
                    Logout
                  </button>
                </li>
                <li>
                  <div className="relative">
                    <button
                      onClick={() => setProfileMenuOpen((prev) => !prev)}
                      className="h-10 w-10 overflow-hidden rounded-full border-2 border-white/60"
                      title="Profile"
                    >
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-white/20 text-sm font-bold text-white">
                          {parsedUser.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                      )}
                    </button>
                    {profileMenuOpen && (
                      <div className="absolute right-0 top-12 w-44 rounded-xl border border-gray-100 bg-white p-2 text-gray-700 shadow-xl">
                        <button
                          onClick={() => {
                            setProfileMenuOpen(false);
                            navigate("/user-dashboard");
                          }}
                          className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
                        >
                          User Dashboard
                        </button>
                        <button
                          onClick={() => {
                            setProfileMenuOpen(false);
                            navigate("/user-dashboard");
                          }}
                          className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
                        >
                          Edit Profile
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    onClick={() => navigate("/register")}
                    className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-indigo-800 shadow-md transition hover:scale-105 hover:bg-blue-50"
                  >
                    Register
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/login")}
                    className="rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-indigo-800"
                  >
                    Login
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
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
              <Button onClick={() => navigate(isLoggedInUser ? "/home" : "/register")}>
                Explore Clubs
              </Button>
              <button
                className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-indigo-700 transition"
                onClick={() => navigate(isLoggedInUser ? "/home" : "/login")}
              >
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
            <button
              className="bg-white text-indigo-700 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition"
              onClick={() => navigate(isLoggedInUser ? "/home" : "/login")}
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}

export default Home;