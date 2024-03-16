"use client"

export default function WriteTweetComponent(props: { isReply?: boolean, postContent: string, onChangePostContent: (e: any) => void }) {
    const { isReply, postContent, onChangePostContent } = props;

    function checkIfScrollBar(e: React.ChangeEvent<HTMLInputElement>) {
        e.target.style.height = "auto";
        const scHeight = e.target.scrollHeight;
        e.target.style.height = `${scHeight}px`;
    }

    function handleTweetTextArea(e: any) { // FIX ME
        checkIfScrollBar(e);
        onChangePostContent(e);
    }

    return (
        <div className="flex flex-row w-full">
            <textarea name="tweet" className="border-none focus:outline-none resize-none w-full bg-transparent text-xl placeholder:font-thin" placeholder={!isReply ? "What's on your mind" : "Post your reply"} onInput={handleTweetTextArea} value={postContent}></textarea>
        </div>
    )
}
