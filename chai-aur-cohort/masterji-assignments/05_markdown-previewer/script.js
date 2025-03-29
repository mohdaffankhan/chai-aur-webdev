document.addEventListener("DOMContentLoaded", function () {
  function previewMarkdown() {
    let text = document.getElementById("markdown").value;
    document.getElementById("content").innerHTML = marked.parse(text);
  }
  
  document.getElementById("clear").addEventListener("click", clearMarkdown);
  
  function clearMarkdown() {
    document.getElementById("markdown").value = "";
    document.getElementById("content").innerHTML = "";
  }
  
  document.getElementById("markdown").addEventListener("input", previewMarkdown);
  previewMarkdown();
});
