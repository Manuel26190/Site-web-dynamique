function deleteProject () {

    const id = document.getElementById("id").value; 
    console.log('id', id);
    fetch (`http://localhost:5678/api/works/${id}`, {
    method: 'DELETE',


    });
}