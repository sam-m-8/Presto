import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

const ModalTemplate = ({ title, children, isModalOpen, panelMaxWidth="max-w-md" }) => {
  const dialogStyle = "relative z-10 focus:outline-none transition duration-200 ease-in ease-out data-[closed]:opacity-0";
  const outerDivStyle = "fixed inset-0 z-10 w-screen overflow-y-auto bg-indigo-100 bg-opacity-75 transition-opacity";
  const innerDivStyle = "flex min-h-full items-center justify-center p-4";
  const dialogPanelStyle = `w-full ${panelMaxWidth} rounded-xl bg-white border border-gray-200 p-6 backdrop-blur-2xl duration-200 ease-out ease-in data-[closed]:opacity-0`;
  const dialogTitleStyle = "text-base/7 font-medium text-indigo-700 text-lg";

  return (
    <>
      <Dialog 
        transition open={isModalOpen}
        as="div"
        className={dialogStyle}
        onClose={() => {}}
      >
        <div className={outerDivStyle}>
          <div className={innerDivStyle}>
            <DialogPanel 
              transition
              className={dialogPanelStyle}
            >
              <DialogTitle
                as="h3"
                className={dialogTitleStyle}
              >
                {title}
              </DialogTitle>

              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default ModalTemplate;