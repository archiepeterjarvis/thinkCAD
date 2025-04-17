"use client"

import React from "react"

import {useState, useRef, useEffect} from "react"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Textarea} from "@/components/ui/textarea"
import {Separator} from "@/components/ui/separator"
import {ScrollArea} from "@/components/ui/scroll-area"
import {
    CuboidIcon as Cube,
    Send,
    Loader2,
    MessageSquare,
    Settings,
    Plus,
    ArrowLeft,
    Menu,
    X,
} from "lucide-react"
import {cn} from "@/lib/utils"
import {ThemeToggle} from "@/components/theme-toggle"
import ModelViewer from "@/components/model-viewer";

type Message = {
    id: string
    role: "user" | "assistant"
    content: string
    timestamp: Date
    modelUrl?: string
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "Hi there! I'm your AI assistant. Describe the 3D model you'd like me to create for you.",
            timestamp: new Date(),
        },
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [currentModelUrl, setCurrentModelUrl] = useState<string | null>(null)
    const [conversations, setConversations] = useState([
        {id: "current", name: "Current Chat", active: true},
    ])
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setIsLoading(true)

        fetch("http://localhost:8000/chat/generate/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({query: input})
        }).then((res) => res.json()).then((data) => setCurrentModelUrl(`http://localhost:8002/${data.url}`));
    }

    useEffect(() => {
        if (input === "") return;

        const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: `I've created a 3D model based on your description: "${input}". You can view, rotate, and download it.`,
            timestamp: new Date(),
            modelUrl: currentModelUrl || "",
        }

        setMessages((prev) => [...prev, aiMessage])
        setIsLoading(false)
        setInput("")
    }, [currentModelUrl]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
        }
    }

    return (
        <div className="flex h-screen flex-col">
            {/* Header */}
            <header className="border-b sticky top-0 z-50 bg-background/80 backdrop-blur-md">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="md:hidden">
                            {sidebarOpen ? <X className="h-5 w-5"/> : <Menu className="h-5 w-5"/>}
                        </Button>
                        <Link href="/" className="flex items-center gap-2">
                            <Cube className="h-5 w-5 text-teal-600"/>
                            <span className="font-bold">thinkCAD</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeToggle/>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/">
                                <ArrowLeft className="h-4 w-4 mr-2"/>
                                Back to Home
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div
                    className={cn(
                        "w-64 border-r bg-muted/40 flex-shrink-0 flex flex-col",
                        "fixed md:static inset-y-0 left-0 z-40 md:z-auto",
                        "transform transition-transform duration-200 ease-in-out",
                        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
                        "md:h-[calc(100vh-65px)]",
                    )}
                >
                    <div className="p-4">
                        <Button
                            className="w-full gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700">
                            <Plus className="h-4 w-4"/>
                            New Chat
                        </Button>
                    </div>

                    <Separator/>

                    <div className="p-2 flex-1 overflow-hidden">
                        <h3 className="px-2 py-1 text-sm font-medium">Recent Conversations</h3>
                        <ScrollArea className="h-full">
                            <div className="space-y-1 p-2">
                                {conversations.map((conversation) => (
                                    <Button
                                        key={conversation.id}
                                        variant={conversation.active ? "secondary" : "ghost"}
                                        className="w-full justify-start gap-2 text-left"
                                    >
                                        <MessageSquare className="h-4 w-4"/>
                                        <span className="truncate">{conversation.name}</span>
                                    </Button>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                    <div className="p-4 border-t">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <Settings className="h-4 w-4"/>
                            Settings
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex flex-1 overflow-hidden">
                        {/* Chat Area */}
                        <div
                            className={cn("flex-1 flex flex-col overflow-hidden", currentModelUrl ? "md:w-1/2" : "w-full")}>
                            {/* Messages */}
                            <ScrollArea className="flex-1 p-4">
                                <div className="space-y-4 max-w-3xl mx-auto">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={cn(
                                                "flex flex-col space-y-2 p-4 rounded-lg",
                                                message.role === "user"
                                                    ? "ml-auto bg-gradient-to-r from-teal-600 to-cyan-600 text-white max-w-[80%]"
                                                    : "mr-auto bg-muted max-w-[80%] border border-border/50",
                                            )}
                                        >
                                            <div className="text-sm">{message.content}</div>
                                            <div className="text-xs opacity-70 ml-auto">
                                                {message.timestamp.toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div
                                            className="flex items-center space-x-2 mr-auto bg-muted p-4 rounded-lg max-w-[80%] border border-border/50">
                                            <Loader2 className="h-4 w-4 animate-spin text-teal-600"/>
                                            <p className="text-sm">Generating your 3D model...</p>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef}/>
                                </div>
                            </ScrollArea>

                            {/* Input Area */}
                            <div className="p-4 border-t bg-background/80 backdrop-blur-sm">
                                <form onSubmit={handleSubmit} className="flex space-x-2">
                                    <Textarea
                                        ref={textareaRef}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Describe the 3D model you want to create..."
                                        className="min-h-[60px] flex-1 resize-none focus-visible:ring-teal-500"
                                        disabled={isLoading}
                                    />
                                    <Button
                                        type="submit"
                                        size="icon"
                                        disabled={isLoading || !input.trim()}
                                        className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                                    >
                                        <Send className="h-4 w-4"/>
                                    </Button>
                                </form>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Try: "A modern office chair with ergonomic design" or "A futuristic spaceship with
                                    detailed wings"
                                </p>
                            </div>
                        </div>

                        {/* 3D Model Preview */}
                        {currentModelUrl && (
                            <div
                                className={cn(
                                    "border-t md:border-t-0 md:border-l bg-muted/30",
                                    "h-[300px] md:h-auto md:flex-1",
                                    "transition-all duration-300 ease-in-out",
                                    "relative",
                                )}
                            >
                                <div className="absolute inset-0 mesh-bg opacity-30"></div>
                                <ModelViewer url={currentModelUrl}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Model Toggle */}
            {currentModelUrl && (
                <div className="md:hidden fixed bottom-20 right-4 z-50">
                    <Button
                        size="icon"
                        className="rounded-full shadow-lg bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                    >
                        <Cube className="h-5 w-5"/>
                    </Button>
                </div>
            )}
        </div>
    )
}
