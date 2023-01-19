//Course constructor
function Course(title,instructor,image){
    this.title=title;
    this.instructor=instructor;
    this.image=image;
}
function UI(){

}
UI.prototype.addtoCreateList=function(course){
    const list=document.getElementById('course-list');
    var html=`
        <tr >
            <td><img style="height:70px; width=120px" src="img/${course.image}"/></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><input type="submit" class="btn btn-danger btn-sm delete" value="Delete"/></td>
        </tr>
    `;
    list.innerHTML+=html;
    
}

UI.prototype.clearControls=function(){
    const title= document.getElementById('title').value="";
    const instructor=document.getElementById('instructor').value="";
    const image=document.getElementById('image').value="";
}

UI.prototype.deleteCourse= function(element){

    if(element.classList.contains('delete')){
        element.parentElement.parentElement.remove();     
    }
}

UI.prototype.showAlert= function(message,className){
    var alert=`
        <div class="alert alert-${className}">
            ${message}
        </div>
    `;
    const row=document.querySelector('.row');
    row.insertAdjacentHTML("beforeBegin",alert);

    setTimeout(()=>{
        document.querySelector('.alert').remove();
    },3000)
}

document.getElementById('new-course').addEventListener('submit', function(e){
//girilen input değerlerini bu kısımda çekiyoruz.
//console'a yazdırdığınızda çekim işlemini test edebilirsiniz.
    const title= document.getElementById('title').value;
    const instructor=document.getElementById('instructor').value;
    const image=document.getElementById('image').value;

    //console.log(title, instructor, image);
    
    //create course object 
    const course=new Course(title, instructor, image);

    console.log(course);

    const ui=new UI();
    if(title==="" || instructor===""|| image===""){
        ui.showAlert("Please , complete to form.","warning");
    }else{
        //create UI
        const ui=new UI();
        //save to object
        ui.addtoCreateList(course);
        //clear to Controls
        ui.clearControls();
        ui.showAlert("The course has been added","success");

    }

    e.preventDefault();
});

  //delete Course
  document.getElementById('course-list').addEventListener('click',function(e){
  const ui= new UI();
  ui.deleteCourse(e.target)
  ui.showAlert("the course has been deleted","danger")
  });




    