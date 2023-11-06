// inputlar
//ekle butonu
//listeleyen eleman

const expenceInput = document.querySelector("#expence");

//console.log(expenceInput);

const fiyatInput = document.querySelector("#fiyat");

//console.log(fiyatInput)

const list = document.querySelector(".list");

//console.log(list)
const formbtn = document.querySelector(".ekle");

//console.log(formbtn);

const totalInf = document.querySelector("#totalinfo");

const select = document.getElementById("filterselect");
const statüscheck = document.getElementById("statusinput");
const nameInput = document.getElementById("nameinput");

//console.log(totalInf)

const username = localStorage.getItem("name");
nameInput.value = username;

nameInput.addEventListener("change", (e) => {
  console.log(e.target.value);
  localStorage.setItem("name", e.target.value);
});

formbtn.addEventListener("click", addexpense);

list.addEventListener("click", handleclick);

select.addEventListener("change", handelfilter);

let toplam = 0;
function updatetoplam(fiyatbilgisi) {
  toplam += Number(fiyatbilgisi);
  totalInf.innerText = toplam;
}

function addexpense(e) {
  //form kendinden gelen sayfa yenileme özelliğini devre dışı bırakma
  e.preventDefault();

  if (expenceInput.value == "" || fiyatInput.value == "") {
    alert("Tüm boş alanlari doldurun");
    return;
  }

  //console.log("addexpense")
  console.log(expenceInput.value);
  const harcamadiv = document.createElement("div");
  harcamadiv.classList.add("expence");

  if (statüscheck.checked) {
    harcamadiv.classList.add("payed");
  }

  // olusturulan divin içeriğine ilgili html elemanları veriliyor
  //Tek tırnak ile sadece tek satır yazabildiğimiz ve içerisine dinamik veri ekleyemediğimiz için backtick (``) kullanılır
  harcamadiv.innerHTML = `
<h2 >${expenceInput.value}</h2>
<h2 id ="value">${fiyatInput.value}</h2> 

<div class="buttons">

    <img  id = "pays" src="images/pay.png"  alt="">
    <img  id = "remove"src="images/remove.png"  alt=""
</div>`;

  // olusturlan harcama divi html tarafına göndreiliyor
  list.appendChild(harcamadiv);
  //tüm işlemler tamamlandıktan sonra toplam fiyat güncelleniyor
  updatetoplam(fiyatInput.value);

  // İnputların icerigini işlem bittikten sonra temizleme
  expenceInput.value = "";
  fiyatInput.value = "";
  //console.log(harcamadiv)
}

function handleclick(e) {
  let tiklananeleman = e.target;
  if (tiklananeleman.id === "remove") {
    console.log("silme");

    const kapsayicielment = tiklananeleman.parentElement.parentElement;

    const deletedprice = kapsayicielment.querySelector("#value").innerText;
    updatetoplam(-Number(deletedprice));
    kapsayicielment.remove();
  }
}


//selectbox her degıstıgınde calısıcak fonksıyon
function handelfilter(e) {
  const harcamakartlari = list.childNodes;
   
  // addeventlistenerdan gelen yani olay bilgisinin hedefteki değerini  filtervalue degiskenıne atıyoruz.
  const filtervalue = e.target.value;
  //console.log(filtervalue)


  // harcama kartlarınınn hepsini foreach ile dön
  harcamakartlari.forEach((harcamakarti) => {

    // switch ile select degerlerini ele aldık 
    switch (filtervalue) {
      case "all":
        //butun harcama kartlarına görünür özelliği aktif ettik
        harcamakarti.style.display = "flex";

        break;

      case "payed":
        if (!harcamakarti.classList.contains("payed")) {
          harcamakarti.style.display = "none";
        } else {
          harcamakarti.style.display = "flex";
        }
        break;
        case "notpayed":
            if (harcamakarti.classList.contains("payed")) {

                
                harcamakarti.style.display="none";
            }
            else{

                harcamakarti.style.display="flex";
            }
            break;
    }
  });
}
