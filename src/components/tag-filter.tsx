"use client"

interface TagFilterProps {
    tags: string[]
    selectedTags: string[]
    onTagToggle: (tag: string) => void
}

export default function TagFilter({tags, selectedTags, onTagToggle}: TagFilterProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
                const active = selectedTags.includes(tag)
                return (
                    <button
                        key={tag}
                        type="button"
                        onClick={() => onTagToggle(tag)}
                        className={`rounded-full border px-3 py-1 text-sm transition ${active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"}`}
                    >
                        {tag}
                    </button>
                )
            })}
        </div>
    )
}
