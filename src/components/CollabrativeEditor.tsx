"use client";
import { useRoom } from "@liveblocks/react"
import React,  { useEffect, useState } from "react";
import { LiveblocksYjsProvider } from "@liveblocks/yjs"
import * as Y from 'yjs'
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import {BlockNoteView} from '@blocknote/shadcn'
import {BlockNoteEditor} from '@blocknote/core'
import {useCreateBlockNote} from '@blocknote/react'
import '@blocknote/shadcn/style.css'
import '@blocknote/core/fonts/inter.css'
import { useSelf } from "@liveblocks/react/suspense";
import stringToColor from "@/lib/stringToColor";



type CollabrativeEditorProps = {
    doc : Y.Doc;
    provider:any;
    darkMode: boolean;

}

function BlockNote({doc , provider, darkMode}: CollabrativeEditorProps) {
    const userInfo = useSelf((me) => me.info )

    const editor:BlockNoteEditor = useCreateBlockNote({
        collaboration:{
            provider,
            fragment: doc.getXmlFragment('document-store'),
            user:{
                name: userInfo?.name || 'Anonymous',
                color: stringToColor(userInfo?.email || 'Anonymous')

            }
        }
    })

    return (
        <div className="relative  max-w-6xl mx-auto"> 
            <BlockNoteView editor={editor} theme= {darkMode ? 'light' : 'dark' } className="min-h-screen" />
        </div>
    )
}


export default function CollabrativeEditor() {
    const room = useRoom(); 
    const [doc, setDoc] = useState<Y.Doc>()
    const [provider, setProvider] = useState<LiveblocksYjsProvider>()
    const [darkMode, setDarkMode] = useState<boolean>(false)

    useEffect(() => {
        const yDoc = new Y.Doc()
        const yProvider = new LiveblocksYjsProvider(room, yDoc);
        setDoc(yDoc)
        setProvider(yProvider)

        return () => {
            yDoc?.destroy()
            yProvider?.destroy()
        }
    }, [room])

    const darkModeStyle = darkMode ? 'text-gray-300 bg-gray-900  hover:bg-gray-200 hover:text-gray-700 ':
    'text-gray-700 bg-gray-200  hover:bg-black/75 hover:text-gray-100'

    if(!doc || !provider) return <div>Loading...</div>

  return (
    
    <div className="max-w-6xl mx-auto ">
        <div  className="flex justify-end items-center gap-2 mr-10  mb-10">
            {/* translate doc  */}
            {/* chat to document  */}

            {/* dark mode button  */}
            <Button className={darkModeStyle } onClick={() => setDarkMode(!darkMode)}> 
                {
                    darkMode ? <Moon /> : <Sun />
                }
            </Button>
        </div>
        <div>
            {/* block Note  */}

            <BlockNote doc={doc} provider={provider} darkMode={darkMode} />

        </div>
    </div>
  )
}