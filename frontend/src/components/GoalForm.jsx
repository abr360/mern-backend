import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateGoal } from '../features/goals/goalSlice';
import RichTextEditor from "rich-text-editor-for-react";
import useRichTextEditor from "rich-text-editor-for-react/hook";

function GoalForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { output, fetchOutput } = useRichTextEditor();
  const { mutate: createGoal, isLoading } = useCreateGoal();
  const [editorKey, setEditorKey] = useState(0);

  const onSubmit = (data) => {
    createGoal(output);
    reset();
    setEditorKey(prevKey => prevKey + 1); // Force re-mount RichTextEditor
  };

  return (
    <section className="max-w-max mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="richText" className="mb-2 font-semibold">Goal</label>
          <RichTextEditor
            
            key={editorKey}
            id="richText"
            toolbarOptions={[
              "word_count",
              "code_block",
              "link",
              "undo",
              "redo",
              "font",
              "header",
              "bold",
              
              "text_color",
              "highlight_color",
              "numbered_list",
              "bulleted_list",
              "align",
              "decrease_indent",
              "increase_indent",
              "direction",
              "blockquote",
              "embed_video",
              "format_media",
              "sub_script",
              "super_script",
            ]}
            customizeUI={{
              backgroundColor: "#fcfcfc",
              primaryColor: "#20464b",
              stickyToolbarOnScroll: true,
            }}
            
            fetchOutput={fetchOutput}
          />
        </div>
        <div>
          <button
            className={`w-full px-4 py-2 text-white font-bold rounded-md ${isLoading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-700'} transition-colors`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Goal'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
