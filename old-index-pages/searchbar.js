document.getElementById('search').addEventListener('input', function() {
    let filter = this.value.toLowerCase();
    let articles = document.querySelectorAll('article');


    articles.forEach(function(article) {
        let text = article.innerText.toLowerCase();
        if (text.includes(filter)) {
            article.style.display = '';
        }
        else {
            article.style.display = 'none';
        }
    });
});