function downCity(animationWindow) {
    animationWindow.innerHTML = "    <div class=\"animation\" style=\"width: 500px; height: 300px; overflow: hidden; background: skyblue\">\n" +
        "        <img src=\"static/assets/city.svg\" alt=\"\" style=\"bottom: 0; left: 10px; height: 200px; width: auto;\">\n" +
        "        <img src=\"static/assets/city.svg\" alt=\"\" style=\"bottom: 0; left: 280px; height: 200px; width: auto;\">\n" +
        "        <img src=\"static/assets/hydrant.svg\" alt=\"\" style=\"bottom: 0; left: 290px;height: 50px; width: auto;\">\n" +
        "        <img src=\"static/assets/tree.svg\" alt=\"\" style=\"bottom: 0; left: 150px;height: 80px; width: auto;\">\n" +
        "        <img src=\"static/assets/tree.svg\" alt=\"\" style=\"bottom: 0; left: 183px;height: 80px; width: auto;\">\n" +
        "        <img src=\"static/assets/fire.svg\" alt=\"\" style=\"bottom: 155px; left: 148px;height: 80px; width: auto;\">\n" +
        "        <img src=\"static/assets/fire.svg\" alt=\"\" style=\"bottom: 102px; left: 256px;height: 80px; width: auto;\">\n" +
        "        <svg class=\"smoke smoke-3 size-1\" viewBox=\"0,0,16,16\" style=\"bottom: 161px; left: 266px;\">\n" +
        "            <circle r=\"6\" cx=\"8\" cy=\"8\" fill=\"currentColor\"></circle>\n" +
        "        </svg>\n" +
        "        <svg class=\"smoke smoke-2 size-3\" viewBox=\"0,0,16,16\" style=\"bottom: 168px; left: 272px;\">\n" +
        "            <circle r=\"6\" cx=\"8\" cy=\"8\" fill=\"currentColor\"></circle>\n" +
        "        </svg>\n" +
        "        <svg class=\"smoke smoke-1 size-2\" viewBox=\"0,0,16,16\" style=\"bottom: 165px; left: 279px;\">\n" +
        "            <circle r=\"6\" cx=\"8\" cy=\"8\" fill=\"currentColor\"></circle>\n" +
        "        </svg>\n" +
        "        <svg class=\"smoke smoke-1 size-3\" viewBox=\"0,0,16,16\" style=\"bottom: 172px; left: 284px;\">\n" +
        "            <circle r=\"6\" cx=\"8\" cy=\"8\" fill=\"currentColor\"></circle>\n" +
        "        </svg>\n" +
        "        <svg class=\"smoke smoke-1 size-1\" viewBox=\"0,0,16,16\" style=\"bottom: 210px; left: 181px;\">\n" +
        "            <circle r=\"6\" cx=\"8\" cy=\"8\" fill=\"currentColor\"></circle>\n" +
        "        </svg>\n" +
        "        <svg class=\"smoke smoke-2 size-3\" viewBox=\"0,0,16,16\" style=\"bottom: 220px; left: 186px;\">\n" +
        "            <circle r=\"6\" cx=\"8\" cy=\"8\" fill=\"currentColor\"></circle>\n" +
        "        </svg>\n" +
        "        <svg class=\"smoke smoke-3 size-2\" viewBox=\"0,0,16,16\" style=\"bottom: 222px; left: 190px;\">\n" +
        "            <circle r=\"6\" cx=\"8\" cy=\"8\" fill=\"currentColor\"></circle>\n" +
        "        </svg>\n" +
        "        <svg class=\"smoke smoke-2 size-1\" viewBox=\"0,0,16,16\" style=\"bottom: 216px; left: 188px;\">\n" +
        "            <circle r=\"6\" cx=\"8\" cy=\"8\" fill=\"currentColor\"></circle>\n" +
        "        </svg>\n" +
        "    </div>"
    gsap.to(".smoke", {
        opacity: 1,
    })
    gsap.to(".smoke", {
        duration: 3,
        y: -55,
        opacity: 0,
        repeat: -1
    });

}