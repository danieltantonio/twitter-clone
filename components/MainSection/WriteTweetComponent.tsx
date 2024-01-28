"use client"

export default function WriteTweetComponent() {
    function checkIfScrollBar(e: React.ChangeEvent<HTMLInputElement>) {
        e.target.style.height = "auto";
        const scHeight = e.target.scrollHeight;
        e.target.style.height = `${scHeight}px`;
    }

    function handleTweetTextArea(e: any) { // FIX ME
        checkIfScrollBar(e);
    }

    return (
        <div className="flex flex-row w-full">
            <textarea name="tweet" className="resize-none w-full bg-transparent text-xl placeholder:font-thin" placeholder="What is happening?" onInput={handleTweetTextArea}></textarea>
        </div>
    )
}
