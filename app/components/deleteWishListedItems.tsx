import { deleteUserWishlistedItemProps } from "~/utils/types";
import { Form } from "@remix-run/react";
export default function DeleteWishListedItems(data: deleteUserWishlistedItemProps) {
  return (
    <>
      <div className="delete-container ">
        <div className="delete-form-button-message-container">
          <div>Are you sure you want to delete this item?</div>
          <div className="delete-form-button-container">
            <button
              onClick={() => {
                data.setWishListedItemsComponentState(null);
                data.setSelectedItemForDeletionFunction(null);
              }}
            >
              Cancel
            </button>
            <Form
              method="DELETE"
              onSubmit={() => {
                data.setWishListedItemsComponentState(null);
                data.setSelectedItemForDeletionFunction(null);
              }}
            >
              <input name="data" value={JSON.stringify(data.selectedItemForDeletion)} type="hidden" />
              <input type="submit"></input>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
