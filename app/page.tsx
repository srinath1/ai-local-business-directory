import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Search,
  MapPin,
  Star,
  PlusCircle,
  Smartphone,
  Share2,
  Link as LinkIcon,
  Cpu,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: 'url("/images/hero.jpg")',
          height: "60vh",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#010818] z-0"></div>

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center px-4 w-full max-w-4xl">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
              Discover and Promote Local Businesses with{" "}
              <span className="inline-block">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-transparent bg-clip-text animate-pulse">
                  AI
                </span>
              </span>
            </h1>

            <p className="text-white mb-5 mx-auto">
              Our Local Business Directory helps you find and support nearby
              businesses. It's free to list your business and easy to discover
              local gems. Connect with your community today!
            </p>
            <Link href="/business/add">
              <Button
                size="lg"
                className="text-lg px-4 md:px-8 py-2 md:py-4 w-full md:w-auto"
              >
                Add Your Business for Free <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 md:mb-20">
            Why Use Our AI-Enhanced Local Business Directory?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<PlusCircle className="w-12 h-12 text-blue-500" />}
              title="Free Business Listings"
              description="Add your business to our directory at no cost. Increase your online presence and reach more local customers."
            />
            <FeatureCard
              icon={<Search className="w-12 h-12 text-green-500" />}
              title="Easy Local Search"
              description="Find businesses in your area quickly and easily. Our search function helps you discover local services and products."
            />
            <FeatureCard
              icon={<Star className="w-12 h-12 text-purple-500" />}
              title="Customer Reviews"
              description="Read and leave reviews for businesses. Help others make informed decisions and improve your services based on feedback."
            />
          </div>

          <div className="mt-20 text-center">
            <Link href="/business/add">
              <Button
                size="lg"
                className="text-lg px-4 md:px-8 py-2 md:py-4 w-full md:w-auto"
              >
                Start Browsing <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Benefits Section */}
      <section className="bg-blue-100 dark:bg-blue-900 py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 md:mb-20">
            Boost Your Local SEO Instantly
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Cpu className="w-12 h-12 text-blue-500" />}
              title="AI-Generated Content"
              description="Our AI creates optimized business descriptions in seconds, saving you time and enhancing your online presence."
            />
            <FeatureCard
              icon={<LinkIcon className="w-12 h-12 text-green-500" />}
              title="SEO Boosting Backlinks"
              description="Gain valuable backlinks to your website, improving your search engine rankings and online visibility."
            />
            <FeatureCard
              icon={<MapPin className="w-12 h-12 text-purple-500" />}
              title="Improved Local Rankings"
              description="Enhance your local SEO with our optimized listings, helping you appear in more local search results."
            />
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-blue-600 dark:bg-blue-800 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Connect with Local Businesses Anytime, Anywhere
          </h2>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex flex-col items-center">
              <MapPin className="w-12 h-12 mb-2" />
              <span>Find Nearby</span>
            </div>
            <div className="flex flex-col items-center">
              <Smartphone className="w-12 h-12 mb-2" />
              <span>Mobile-Friendly</span>
            </div>
            <div className="flex flex-col items-center">
              <Share2 className="w-12 h-12 mb-2" />
              <span>Share Favorites</span>
            </div>
          </div>
          <p className="text-xl mb-8 mx-auto">
            Join thousands of local businesses and customers who are
            strengthening their communities. Whether you're looking to promote
            your business or discover local services, our directory makes it
            simple!
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="/businesses" className="w-full md:w-auto">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-4 md:px-8 py-2 md:py-4 w-full"
              >
                Explore Local Businesses <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link href="/business/add" className="w-full md:w-auto">
              <Button
                size="lg"
                className="text-lg px-4 md:px-8 py-2 md:py-4 w-full"
              >
                Add Your Business <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 text-center">
        {description}
      </p>
    </div>
  );
}
