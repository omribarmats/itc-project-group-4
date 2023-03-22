import React from 'react'
import UiDialog from '../../ui/uiKit/componentsUi/UiDialog'

export default function Modal() {

    const handleOnClose = () => {
console.log('close modal')
    }

  return (
    <UiDialog open={false} onClose={handleOnClose}>
        
        <div>Modal</div>
    </UiDialog>
  )
}
