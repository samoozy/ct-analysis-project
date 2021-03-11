const ARTICLES = {
  1: {
    id: 1,
    meta: {
      title: "Lorem Ipsum",
      url: "lorem-ipsum",
      categories: ["LOREM"],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum a ante sed commodo. Maecenas luctus elementum enim vitae dapibus. In hac habitasse platea dictumst.",
      author: "Test Admin",
    },
  },
  2: {
    id: 2,
    meta: {
      title: "Lorem Ipsum2",
      url: "lorem-ipsum2",
      categories: ["LOREM"],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum a ante sed commodo. Maecenas luctus elementum enim vitae dapibus. In hac habitasse platea dictumst.",
      author: "Test Admin",
    },
  },
  3: {
    id: 3,
    meta: {
      title: "Lorem Ipsum3",
      url: "lorem-ipsum3",
      categories: ["IPSUM"],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum a ante sed commodo. Maecenas luctus elementum enim vitae dapibus. In hac habitasse platea dictumst.",
      author: "Test Admin",
    },
  },
}

const CONTENTS = {
  1: {
    id: 1,
    articleId: 1,
    content: "PAID_CONTENT: Nam sit amet volutpat turpis, rutrum vulputate justo. Donec suscipit mollis massa sed laoreet. Vestibulum dolor leo, fermentum ut massa vitae, aliquam molestie nunc. Vivamus hendrerit a metus convallis gravida. Integer id porttitor massa. Maecenas vulputate maximus tempus.",
    downloadUrl: "https://google.com"
  },
  2: {
    id: 2,
    articleId: 2,
    content: "PAID_CONTENT: Phasellus quis ipsum gravida, placerat orci sit amet, scelerisque mauris. Duis elementum libero dolor, a ultrices libero elementum nec. Pellentesque auctor tincidunt nisi, a posuere ex scelerisque vitae.",
    downloadUrl: "https://google.com"
  },
  3: {
    id: 3,
    articleId: 3,
    content: "PAID_CONTENT: Phasellus lobortis feugiat malesuada. Nam mattis leo augue. Donec arcu tellus, porta at neque vitae, rhoncus rhoncus libero. Duis elementum dui sem, sed accumsan sem gravida rutrum.",
    downloadUrl: "https://google.com"
  }
}

function findArticleById(articleId) {
  return ARTICLES[articleId]
}

function findContentForArticle(articleId) {
  return Object.values(CONTENTS).find(content => content.articleId == articleId)
}

module.exports = {
  ARTICLES,
  CONTENTS,
  findArticleById,
  findContentForArticle
}