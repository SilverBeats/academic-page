**保命：代码、命名、文件组织结构、功能设置、界面设计都不一定规范，求轻喷**

## 前言

一时兴起做的一个学术主页项目，具备如下功能：

**基本功能：**

1.   展示个人信息，包括照片、中英文姓名、地址、联系方式等
2.   自我介绍页面，即`home page`
3.   出版物页面
4.   CV页面：学术简历
5.   Projects页面

**出版物页面的附加功能：**

1.   提供过滤功能，可以通过发表年份、作者、期刊/会议，进行过滤（移动端目前还没做）
2.   每条出版记录下，提供四个按钮：bib，paper，video，blog，分别对应该文献的bib格式引用，论文下载，论文视频报告，博客讲解。【我是比较推崇文作者积极地对自己的论文写一份详细讲解的】

## 使用

### 准备项目

如果你只想用这个学术主页，两个途径：

1.   克隆此项目，`pnpm i`安装需要的依赖后执行`npm run build`，build之后的结果传到github主页仓库中即可
2.   不想build，那么克隆`https://github.com/silverbeats/silverbeats.github.io.git`，然后修改相应内容即可

### 配置config.json

| 字段        | 描述                                             |
| ----------- | ------------------------------------------------ |
| hasLogo     | 如果设置为`true`会显示在导航栏的最左侧           |
| logoInfo    | 设置logo路径以及宽高                             |
| adoptSearch | 如果设置为`false`，出版物页面的搜索框会消失      |
| userInfo    | 设置个人性息，用不上的字段可以设置`null`或者删掉 |
| navInfo     | 导航栏设置，目前只支持如下四种                   |

```json
{
    ...,
    "navInfo": {
        "home": "/",
        "publications": "/publications",
        "cv": "/cv",
        "projects": "/projects"
	}
}
```

### 修改CV和Home

只需要修改`public/pages`（`dist/pages`）中的`home.md`和`cv.md`即可

### 添加出版物记录

所有的出版物记录在`public/pages/publications.json`（`dist/pages/publications.json`）中维护，下面是一条完整的记录：

```json
[
    {
        "title": "Author1, Author2, Author3, et al. Title [J] Journal Name, Year, Volume: pp.",
        "authors": [
            "Author1", "Author2", "Author3", "Author4", "Author5", "Author6"
        ],
        "bookTitle": "Journal Name",
        "year": 2024,
        // authorType取值是任意的
        // 此字段会用于出版物过滤，建议是简名知意一些
        // 比如：1 表示一作，2表示二作，...
        // 若authorType是数字，程序在搜索框选项内容显示上会做一定的处理
        // 比如，1会显示成 1st Autho ；2 -> 2nd Author；3 -> 3rd Author；n -> nth Author (n≥4)
        "authorType": [
            1
        ],
        "paperType": "journal",
        "addition": {
            // 网络视频地址，或者 videos 目录下视频的文件名（注意，是文件名）
            "video": "url video",
            // bibs 目录下相应的文件名（注意，是文件名），扩展名必须是bib
            "bib": "paper1.bib",
            // posts 目录下相应的文件名（注意，是文件名），扩展名必须是md
            "blog": "paper1",
            // papers 目录下相应的文件名（注意，是文件名），扩展名必须是pdf
            "paper": "paper1.pdf"
        }
    }
]
```

### 添加项目记录

与添加出版物记录类似，略。
