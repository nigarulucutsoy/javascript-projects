//Course class
class Course{
    constructor(title,instructor,image){
        this.courseID=Math.floor(Math.random()*100000);
        this.title = title;
        this.instructor = instructor;
        this.image = image;
    }
}

//UI class
class UI {
    addtoCreateList(course){
        const list=document.getElementById('course-list');
        var html=`
            <tr >
                <td><img style="height:70px; width=120px" src="img/${course.image}"/></td>
                <td>${course.title}</td>
                <td>${course.instructor}</td>
                <td><input type="submit" data-id="${course.courseID}" class="btn btn-danger btn-sm delete" value="Delete"/></td>
            </tr>
        `;
        list.innerHTML+=html;
        
    };
    clearControls(){
        const title= document.getElementById('title').value="";
        const instructor=document.getElementById('instructor').value="";
        const image=document.getElementById('image').value="";
    };
    deleteCourse(element){

        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();    
            return true; 
        }
      
    };
    showAlert(message,className){
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
    ;
};

//Storage class

class Storage{

    //LocalS.'den bilgi getirir.
    static getCourses(){
        let courses;

        if(localStorage.getItem('courses')===null){
            courses=[];
        }else{
            courses=JSON.parse(localStorage.getItem('courses'));
        }

        return courses;
    };

    //getCourse'dan aldığı bilgiyi gösterir
    static displayCourses(){
        const courses=Storage.getCourses();

        courses.forEach(course=>{
            const ui =new UI();
            ui.addtoCreateList(course);
        })
    };

    //Local'e course ekler
    static addCourse(course){
        const courses=Storage.getCourses();
        courses.push(course);
        localStorage.setItem('courses',JSON.stringify(courses));
    };

    //Local'den course siler.
    static deleteCourse(element){
        if(element.classList.contains('delete')){
            const id=element.getAttribute('data-id');
           
            const courses = Storage.getCourses();

            courses.forEach((course,index)=>{
                if(course.courseID==id){
                    courses.splice(index,1);
                }
            });
            localStorage.setItem('courses',JSON.stringify(courses))
        }
    };
}
//Ekran yüklendiği anda çalışacaktır.
document.addEventListener("DOMContentLoaded",Storage.displayCourses)

document.getElementById('new-course').addEventListener('submit', function(e){
    //girilen input değerlerini bu kısımda çekiyoruz.
    //console'a yazdırdığınızda çekim işlemini test edebilirsiniz.
        const title= document.getElementById('title').value;
        const instructor=document.getElementById('instructor').value;
        const image=document.getElementById('image').value;
    
        //console.log(title, instructor, image);
        
        //create course object 
        const course=new Course(title, instructor, image);
        
        //create UI
        console.log(course);
    
        const ui=new UI();
        if(title==="" || instructor===""|| image===""){
            ui.showAlert("Please , complete to form.","warning");
        }else{
            //add course to list
            ui.addtoCreateList(course);

            //save to LS
            Storage.addCourse(course);

            //clear to Controls
            ui.clearControls();
            ui.showAlert("The course has been added","success");
    
        }
    
        e.preventDefault();
    });
    
      //delete Course
      document.getElementById('course-list').addEventListener('click',function(e){
      const ui= new UI();
      //delete to Course
      if(ui.deleteCourse(e.target)==true){
          //delete from LS
          Storage.deleteCourse(e.target);

          ui.showAlert("the course has been deleted","danger")
      }

      
      });
    
    
    
    
        