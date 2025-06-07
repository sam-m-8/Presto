import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useState } from 'react';
import RearrangeSlidesModal from './RearrangeSlidesModal';
import TransitionsModal from './TransitionsModal';
import historyIcon from "../../assets/history-icon.svg";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DropdownButton = () => {
  // initialise state handling for slide rearrange and transition modals
  const [isRearrangeModalOpen, setIsRearrangeModalOpen] = useState(false);
  const openRearrageModal = () => setIsRearrangeModalOpen(true);
  const closeRearrageModal = () => setIsRearrangeModalOpen(false);

  const [isTransitionsModalOpen, setIsTransitionsModalOpen] = useState(false);
  const openTransitionsModal  = () => setIsTransitionsModalOpen(true);
  const closeTransitionsModal  = () => setIsTransitionsModalOpen(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // navigate to presentation's history page
  const handleHistoryClick = () => {
    navigate(`/presentations/${id}/history`);
  }

  const buttonStyle = "text-white hover:bg-white/20 rounded";
  const iconStyle = "size-4 md:size-5";
  const itemsListStyle = "w-50 origin-top-right shadow-lg rounded-lg border border-white/5 bg-white p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0";
  const itemStyle = "group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-indigo-200/20 text-indigo-700";
  return (
    <>
      <Menu>
        <MenuButton className={buttonStyle} aria-label="More features">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15" className={iconStyle}>
            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
          </svg>
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end" 
          className={itemsListStyle}>
          <MenuItem>
            <button className={itemStyle} onClick={openRearrageModal}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6" />
              </svg>
              <p>Rearrange Slides</p>
            </button>
          </MenuItem>
          <MenuItem>
            <button className={itemStyle} onClick={openTransitionsModal}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
              </svg>
              <p>Add Transition</p>
            </button>
          </MenuItem>
          <MenuItem>
            <button className={itemStyle} onClick={handleHistoryClick}>
              <img
                src={historyIcon}
                className="size-5"
              />
              <p>Version History</p>
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
      <RearrangeSlidesModal isModalOpen={isRearrangeModalOpen} closeModal={closeRearrageModal} />
      <TransitionsModal isModalOpen={isTransitionsModalOpen} closeModal={closeTransitionsModal} />
    </>
  )
}

export default DropdownButton;