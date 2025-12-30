"use client"

import Link from "next/link"
import {useState} from "react"
import Image from "next/image"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"

export default function BlogHeader() {
    const [open, setOpen] = useState(false)

    return (
        <header className="border-b border-border">
            <div className="mx-auto max-w-5xl px-6 py-8 md:px-8 lg:px-12">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-xl font-medium tracking-tight text-foreground">
                        Blog
                    </Link>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <button className="transition-opacity hover:opacity-80">
                                <Image
                                    src="/placeholder.svg?height=40&width=40"
                                    alt="プロフィール画像"
                                    width={40}
                                    height={40}
                                    className="rounded-full"
                                />
                            </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md rounded-sm">
                            <DialogHeader>
                                <DialogTitle className="text-lg font-medium">プロフィール</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                                <div className="flex justify-center">
                                    <Image
                                        src="/placeholder.svg?height=96&width=96"
                                        alt="プロフィール画像"
                                        width={96}
                                        height={96}
                                        className="rounded-full"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">名前</h3>
                                    <p className="mt-1 text-foreground">naki</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">職業</h3>
                                    <p className="mt-1 text-foreground">バックエンドエンジニア</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground">自己紹介</h3>
                                    <p className="mt-1 text-sm leading-relaxed text-foreground">
                                        Text
                                    </p>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </header>
    )
}
