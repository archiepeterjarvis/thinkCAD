import Link from "next/link"
import { ArrowRight, CuboidIcon as Cube, Layers, Zap, Code, Sparkles, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import ModelViewer from "@/components/model-viewer"
import FeatureCard from "@/components/feature-card"
import PricingCard from "@/components/pricing-card"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Cube className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold">thinkCAD</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Features
            </Link>
            <Link href="#examples" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Examples
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Pricing
            </Link>
            <Link href="/chat" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Create
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="sm">
              Log in
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
            >
              Sign up
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 mesh-bg -z-10"></div>
          <div className="container flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent mb-8">
              <Wand2 className="h-4 w-4 text-teal-600" />
              <span className="text-sm font-medium">AI-powered 3D model generation</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl leading-tight">
              Transform your <span className="gradient-text">ideas</span> into stunning 3D models
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
              Create professional-quality 3D models in seconds using our advanced generative AI technology. No design
              experience required.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                asChild
              >
                <Link href="/chat">
                  Start creating <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                View examples
              </Button>
            </div>

            <div className="mt-16 relative w-full max-w-4xl mx-auto">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl blur-md opacity-75"></div>
              <div className="relative h-[500px] rounded-lg overflow-hidden border bg-background">
                <ModelViewer />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Powerful features for creators</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform combines cutting-edge AI with intuitive tools to help you create amazing 3D models with
                ease.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Sparkles />}
                title="AI-Powered Generation"
                description="Create detailed 3D models from text descriptions using our advanced AI algorithms."
              />
              <FeatureCard
                icon={<Zap />}
                title="Lightning Fast"
                description="Generate models in seconds, not hours. Iterate quickly on your creative ideas."
              />
              <FeatureCard
                icon={<Layers />}
                title="Customizable Output"
                description="Fine-tune your models with detailed controls for materials, textures, and geometry."
              />
              <FeatureCard
                icon={<Code />}
                title="Developer API"
                description="Integrate our 3D generation capabilities directly into your applications."
              />
              <FeatureCard
                icon={<Cube />}
                title="Multiple Formats"
                description="Export your models in various formats including GLB, GLTF, OBJ, and more."
              />
              <FeatureCard
                icon={<ArrowRight />}
                title="One-Click Export"
                description="Seamlessly export to popular 3D software or game engines."
              />
            </div>
          </div>
        </section>

        {/* Examples */}
        <section id="examples" className="py-20 relative">
          <div className="absolute inset-0 mesh-bg -z-10"></div>
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">See what our AI can create</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse through examples of 3D models created with thinkCAD's AI technology.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Modern Furniture", description: "Sleek and contemporary furniture designs" },
                { name: "Character Models", description: "Detailed character models for games and animation" },
                { name: "Architectural Elements", description: "Buildings, structures, and architectural details" },
                { name: "Product Prototypes", description: "Realistic product mockups and prototypes" },
                { name: "Vehicle Designs", description: "Cars, aircraft, and other vehicle concepts" },
                { name: "Abstract Art", description: "Creative and unique abstract 3D sculptures" },
              ].map((category, index) => (
                <div key={index} className="glass-card rounded-xl overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center">
                    <Cube className="h-12 w-12 text-white" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{category.description}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      View examples
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Simple, transparent pricing</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that works best for your needs. All plans include access to our core AI technology.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <PricingCard
                title="Starter"
                price="$19"
                description="Perfect for hobbyists and beginners"
                features={[
                  "20 model generations per month",
                  "Standard resolution output",
                  "Basic editing tools",
                  "Email support",
                ]}
                buttonText="Get started"
                buttonVariant="outline"
              />
              <PricingCard
                title="Professional"
                price="$49"
                description="For serious creators and small teams"
                features={[
                  "100 model generations per month",
                  "High resolution output",
                  "Advanced editing tools",
                  "Priority support",
                  "API access",
                ]}
                buttonText="Get started"
                buttonVariant="default"
                highlighted={true}
              />
              <PricingCard
                title="Enterprise"
                price="Custom"
                description="For organizations with specific needs"
                features={[
                  "Unlimited model generations",
                  "Ultra-high resolution output",
                  "Full suite of editing tools",
                  "Dedicated support",
                  "Custom API integration",
                  "SLA guarantees",
                ]}
                buttonText="Contact sales"
                buttonVariant="outline"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 relative">
          <div className="absolute inset-0 mesh-bg -z-10"></div>
          <div className="container">
            <div className="glass-card rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to transform your ideas into 3D?</h2>
              <p className="mb-8 max-w-2xl mx-auto text-muted-foreground">
                Join thousands of creators who are already using our platform to bring their imagination to life.
              </p>
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
              >
                Start creating now <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Examples
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Licenses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Cube className="h-5 w-5 text-teal-600" />
              <span className="font-semibold">thinkCAD</span>
            </div>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} thinkCAD. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
