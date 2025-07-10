import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, MessageCircle, ArrowRight, Phone, Lock, Timer, ChevronRight, CheckCircle2 } from 'lucide-react';
import PaymentsPage from './components/PaymentsPage';
import PaymentSuccessPage from './components/PaymentSuccessPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'payments' | 'success'>('home');
  const [spotsLeft] = useState(23);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage('payments');
  };

  const handlePaymentSuccess = () => {
    setCurrentPage('success');
  };

  const crops = [
    { name: 'Maize', trend: 'up', change: '+2.5%', farmers: 12 },
    { name: 'Wheat', trend: 'up', change: '+1.8%', farmers: 8 },
    { name: 'Rice', trend: 'down', change: '-0.5%', farmers: 15 },
    { name: 'Soybeans', trend: 'up', change: '+3.2%', farmers: 7 }
  ];

  // Render different pages based on current state
  if (currentPage === 'payments') {
    return <PaymentsPage onPaymentSuccess={handlePaymentSuccess} />;
  }

  if (currentPage === 'success') {
    return <PaymentSuccessPage />;
  }

  // Home page
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      {/* Announcement Bar */}
      <div className="bg-green-500 text-black px-4 py-2 text-center text-sm font-medium">
        <span className="animate-pulse">🔥</span> Breaking: First 100 farmers get priority trading & best deals!
      </div>

      {/* Header */}
      <header className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold">
              <span className="text-white">farm</span>
              <span className="text-green-500">tex</span>
              <span className="text-white">hub</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full">
              <Timer className="h-4 w-4" />
              <span>Early access ends in {formatTime(timeLeft)}</span>
            </div>
            <a href="#join" className="bg-green-500 text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-green-400 transition-colors">
              Join Now ({spotsLeft} spots left)
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 pt-16 pb-8 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full text-sm mb-6">
              <span className="animate-pulse">●</span> 47 farmers trading right now
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Uganda Farmers Are Finally Trading
              <span className="text-green-500"> Without Middlemen</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Join the direct trading revolution. Farmers are making 30% more on average. 
              Will you be part of the first group?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setCurrentPage('payments')}
                className="bg-green-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-400 transition-colors flex items-center justify-center gap-2"
              >
                Start Trading Today
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                Find Direct Suppliers
                <Users className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>30% Higher Profits</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>24hr Trading</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Zero Middlemen</span>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="px-4 py-12 bg-zinc-900/50 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="text-4xl font-bold text-green-500 mb-2">30%</div>
                <p className="text-gray-400">Average profit increase for farmers</p>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-green-500 mb-2">24hrs</div>
                <p className="text-gray-400">Average time to first trade</p>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-green-500 mb-2">100+</div>
                <p className="text-gray-400">Active farmers this week</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-16 bg-zinc-900 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Farmers Choose Farmtex</h2>
              <p className="text-gray-400">Join the fastest-growing agricultural marketplace in Uganda</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-black p-6 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-colors">
                <MessageCircle className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Instant WhatsApp Trading</h3>
                <p className="text-gray-400">Join active trade groups and start selling immediately. No waiting.</p>
              </div>
              <div className="bg-black p-6 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-colors">
                <Phone className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">SMS-Based Trading</h3>
                <p className="text-gray-400">Trade directly from your basic phone. No smartphone needed.</p>
              </div>
              <div className="bg-black p-6 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-colors">
                <TrendingUp className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI Price Insights</h3>
                <p className="text-gray-400">Get the best prices with our AI-powered market analysis.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Price Insight Section */}
        <section className="px-4 py-16 bg-black sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Live Trading Activity</h2>
            <p className="text-gray-400 mb-8">Join these farmers already trading on Farmtex</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {crops.map((crop) => (
                <div key={crop.name} className="bg-zinc-900 p-6 rounded-xl border border-green-500/20 relative group cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 group-hover:opacity-0 transition-opacity"></div>
                  <h3 className="font-semibold text-lg mb-4">{crop.name}</h3>
                  <div className="relative">
                    {/* Blurred Price */}
                    <div className="space-y-2 blur-[8px] select-none pointer-events-none">
                      <p className="text-2xl font-bold text-green-500">₹{Math.floor(Math.random() * 50 + 20)}/kg</p>
                      <p className={`text-sm ${crop.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {crop.change}
                      </p>
                    </div>
                    
                    {/* Overlay Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 bg-black/80">
                      <Lock className="h-5 w-5 text-green-500 mb-2" />
                      <span className="text-sm font-medium text-green-500">Join to unlock live prices</span>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-400">
                    {crop.farmers} farmers trading
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 space-y-4">
              <p className="text-lg text-gray-300">
                Get access to real-time prices, market trends, and instant trading
              </p>
              <button 
                onClick={() => setCurrentPage('payments')}
                className="inline-flex items-center gap-2 bg-green-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-green-400 transition-colors"
              >
                Start Trading Now
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        {/* FOMO Section */}
        <section className="px-4 py-16 bg-zinc-900 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Early Access Benefits</h2>
            <div className="space-y-4">
              <div className="bg-black p-4 rounded-xl border border-green-500/20">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/10 p-2 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">Priority Trading Access</h3>
                    <p className="text-sm text-gray-400">Your trades get shown to buyers first</p>
                  </div>
                </div>
              </div>
              <div className="bg-black p-4 rounded-xl border border-green-500/20">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/10 p-2 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">Zero Commission Period</h3>
                    <p className="text-sm text-gray-400">Trade commission-free for 3 months</p>
                  </div>
                </div>
              </div>
              <div className="bg-black p-4 rounded-xl border border-green-500/20">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/10 p-2 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">Dedicated Support</h3>
                    <p className="text-sm text-gray-400">Direct line to our trade support team</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="join" className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto bg-zinc-900 rounded-2xl shadow-xl p-8 border border-green-500/20">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Join Our Trading Network</h2>
              <p className="text-gray-400">
                Only {spotsLeft} priority spots remaining
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-black border border-green-500/20 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 bg-black border border-green-500/20 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">
                  I am a
                </label>
                <select
                  id="type"
                  className="w-full px-4 py-2 bg-black border border-green-500/20 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white"
                  required
                >
                  <option value="farmer">Farmer</option>
                  <option value="buyer">Buyer</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-black py-3 rounded-lg font-semibold hover:bg-green-400 transition-colors flex items-center justify-center gap-2"
              >
                Join Now & Start Trading
                <ChevronRight className="h-5 w-5" />
              </button>
              <p className="text-center text-sm text-gray-400">
                Join now and start trading within 24 hours
              </p>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2024 Farmtex Hub. Revolutionizing agricultural trade in Uganda.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
