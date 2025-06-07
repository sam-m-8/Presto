import AddTextButton from "../slide_component_types/AddTextButton";
import AddImageButton from "../slide_component_types/AddImageButton";
import AddVideoButton from "../slide_component_types/AddVideoButton";
import AddCodeButton from "../slide_component_types/AddCodeButton";
import EditBackgroundButton from "../slide_features/EditBackgroundButton";

const ComponentsToolbar = () => {
  const toolbarStyle = "inline-flex bg-zinc-200 w-full justify-around py-1 rounded-xl";

  return (
    <div className={toolbarStyle}>
      <AddTextButton />
      <AddImageButton />
      <AddVideoButton />
      <AddCodeButton />
      <EditBackgroundButton />
    </div>
  )
}

export default ComponentsToolbar;