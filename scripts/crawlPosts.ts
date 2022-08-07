import fs from 'node:fs'
import playwright from 'playwright'

const run = async () => {
  // launch browser
  const browser = await playwright.chromium.launch({
    headless: true, // Show the browser.
  })
  // browser context
  const context = await browser.newContext()

  const pageGoto = async function () {
    // create page
    const page = await context.newPage()
    try {
      await page.goto('https://www.jianshu.com/')
    } catch (error) {
      console.log('Page load failed: ' + '\n')
      console.log(error)
      return
    }
    await page.click('.container')
    await page.mouse.wheel(0, 10000)

    const noteListElements = page.locator('#list-container')
    await noteListElements.waitFor()
    const nodeList = await noteListElements.evaluate(() => {
      const items = document.querySelectorAll('ul.note-list li')
      if (!items) {
        return []
      }
      const posts: Record<string, any>[] = []
      items.forEach((li) => {
        const post: Record<string, any> = {}
        const titleLink = li.querySelector('a.title')
        const imgEl = li.querySelector('img.img-blur-done')
        const abstractEl = li.querySelector('.abstract')
        const diamondEl = li.querySelector('.meta .jsd-meta')
        const nicknameEl = li.querySelector('.meta .nickname')
        const commentEl = li.querySelector('.meta .nickname+a')
        const likeEl = li.querySelector('.meta span:last-child')
        if (titleLink) {
          const profileLink = titleLink.getAttribute('href')
          const title = titleLink.textContent

          post.title = title
          post.profile_link = profileLink
          if (profileLink) {
            post.id = profileLink.match(/(?<=(\/p\/))(.*)?$/)?.[0]
          }
        }

        if (imgEl) {
          const imgSource = imgEl.getAttribute('src')
          post.img_source = imgSource
        }

        if (abstractEl) {
          const abstract = abstractEl.textContent
          post.abstract = abstract
        }

        if (diamondEl) {
          const diamondCount = diamondEl.textContent
          post.diamond_count = diamondCount
        }

        if (nicknameEl) {
          const nickname = nicknameEl.textContent
          post.nickname = nickname
        }

        if (commentEl) {
          const commentCount = commentEl.textContent
          post.comment_count = commentCount
        }

        if (likeEl) {
          const likeCount = likeEl.textContent
          post.like_count = likeCount
        }

        posts.push(post)
      })

      return posts
    })
    console.log('nodeList: ')
    console.log(JSON.stringify(nodeList))

    try {
      fs.mkdirSync('./cache')
      fs.writeFileSync(
        './cache/posts.json',
        JSON.stringify(nodeList),
        'utf-8'
      )
    } catch (e) {
      console.log(e)
    }

    // const col = mongodb.col(process.env.MONGODB_POST_COLLECTION_NAME!)
    // try {
    //   await col.deleteMany({})
    //   await col.insertMany(nodeList)
    //   console.log('nodeList insert success')
    // } catch (e) {
    //   console.log(e)
    // }

    await page.close()
  }
  pageGoto().then(async () => await browser.close())
}

run()
