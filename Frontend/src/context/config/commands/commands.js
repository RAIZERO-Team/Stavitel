// ============= Commands button style =============
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

// ============= Commands button =============
export default {
  defaults: [
    {
      id: "undo",
      run: (editor, sender) => {
        sender.set("active", false);
        editor.UndoManager.undo(true);
      },
    },
    {
      id: "redo",
      run: (editor, sender) => {
        sender.set("active", false);
        editor.UndoManager.redo(true);
      },
    },
    {
      id: "clean-all",
      run: (editor, sender) => {
        sender.set("active", false);
        if (
          confirm(
            swalWithBootstrapButtons
              .fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true,
              })
              .then((result) => {
                if (result.isConfirmed) {
                  swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                  });
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error",
                  });
                }
              })
          )
        ) {
          editor.runCommand("core:canvas-clear");
        }
      },
    },
  ],
};
