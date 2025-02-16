import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-[url('/grid.svg')] bg-fixed">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 border-b backdrop-blur-sm bg-white/50 sticky top-0 z-50">
        <div className="flex gap-2 items-center">
          <Image src="/logo.svg" alt="logo" width={40} height={40} className="hover:rotate-12 transition-transform" />
          <h2 className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
          StudyMate AI
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="hover:bg-primary/5 transition-colors">
              Dashboard
            </Button>
          </Link>
          <UserButton afterSignOutUrl="/"/>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            <h1 className="text-5xl font-bold text-primary mb-6 animate-fade-in">
              Transform Your Learning Experience
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
              Create personalized study materials using AI. Generate flashcards, quizzes, 
              and notes to enhance your learning journey.
            </p>
            <div className="flex gap-4 justify-center animate-fade-in">
              <Link href="/create">
                <Button 
                  size="lg" 
                  className="text-lg px-8 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/20"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 hover:bg-primary/5 transition-all duration-300"
                >
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-4 gap-8 mt-20 animate-fade-in-up">
            <div className="group text-center p-6 border rounded-lg hover:border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/50 backdrop-blur-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Image 
                  src="/flashcard.png" 
                  alt="Flashcards" 
                  width={30} 
                  height={30} 
                  className="group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
              <h3 className="font-semibold text-xl mb-2">Interactive Flashcards</h3>
              <p className="text-gray-600">
                Create and study with AI-generated flashcards for better memory retention
              </p>
            </div>

            <div className="group text-center p-6 border rounded-lg hover:border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/50 backdrop-blur-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Image 
                  src="/quiz.png" 
                  alt="Quiz" 
                  width={30} 
                  height={30} 
                  className="group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
              <h3 className="font-semibold text-xl mb-2">Smart Quizzes</h3>
              <p className="text-gray-600">
                Test your knowledge with personalized quizzes adapted to your learning pace
              </p>
            </div>

            <div className="group text-center p-6 border rounded-lg hover:border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/50 backdrop-blur-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Image 
                  src="/notes.png" 
                  alt="Notes" 
                  width={30} 
                  height={30} 
                  className="group-hover:scale-110 transition-transform duration-300" 
                />
              </div>
              <h3 className="font-semibold text-xl mb-2">Comprehensive Notes</h3>
              <p className="text-gray-600">
                Generate detailed study notes from any topic with AI assistance
              </p>
            </div>

            <div className="group text-center p-6 border rounded-lg hover:border-primary/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/50 backdrop-blur-sm">
  <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
    <Image 
      src="/qa.png" 
      alt="Q&A" 
      width={30} 
      height={30} 
      className="group-hover:scale-110 transition-transform duration-300" 
    />
  </div>
  <h3 className="font-semibold text-xl mb-2">Interactive Q&A</h3>
  <p className="text-gray-600">
    Practice with AI-generated questions and answers to reinforce your understanding
  </p>
</div>
          </div>
        </div>
      </main>
    </div>
  );
}