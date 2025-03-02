import React, { useState } from "react";
import { useTodo } from "../context";

function TodoForm() {
    const [text, setText] = useState("");
    const { addTodo } = useTodo();

    const add=(e)=>{
        e.preventDefault();
        if(text.trim() === "") return;
        addTodo(text); // rest fields are set to default as we are not passing them
        setText("");
    }

    return (
        <form onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;