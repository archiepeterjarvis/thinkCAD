import ChatInterface from "@/components/chat-interface"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "thinkCAD - AI Chat Interface",
  description: "Describe the 3D model you want to create and our AI will generate it for you.",
}

export default function ChatPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ChatInterface />
    </div>
  )
}
