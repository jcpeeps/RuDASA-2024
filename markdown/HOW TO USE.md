---
title: 'Markdown Cheat Sheet'
---
# Hi! Welcome to Markdown! This is your extensive cheat-sheet for how to use Markdown

<!-- This is a comment. These are included in almost every markdown file we have created for you. These are litte guides on how to write and edit in markdown. These are not displayed on a webpage and are used to add extra information. You do not need to change these. -->

## What is Markdown?
Markdown is, essentially, a special text language where certain symbols are given certain meaning. Markdown is used to create text files (similar to any word or text document) that can be easily formatted for the web. Markdown works hand-in-hand with other languages like HTML (HTML can be used directly in markdown files).

If you want more specific information about Markdown, see the [documentation and cheat sheet](https://www.markdownguide.org/cheat-sheet/)

---

## Getting Started
To **create a Markdown file**, you can use any text editor (such as notepad, notepad++, Scite or Visual Studio Code). Save the text file with the extension **.md**. This lets the processor know that this file is a Markdown file (like MS Word files have a .doc/.docx extension). Do *not* save the file as .txt.md, save as .md only.

You will typically use a new markdown file to **create new resource pages**. Please ensure these new files are saved in the *correct* folder in the **resources** or **portal** directories, in order to stay organized and make sure the resource pages are shown correctly on the website. Make sure these files have the **.md extension**.

### Make sure all new resource pages include these three lines at the very top of the page:
``````
---
title: "[Change this title to the name of the resource]"
---
``````

Otherwise, any other content on the site you want to change, you can **edit in the files directly** by navigating to that file and changing the content, saving your work and reloading the webpage. **Do not move these files around**, as content may be lost or errors may occur!

### Icons
If you would like to **add more resource/portal pages with their own new icons**, follow these steps:
1. Create the markdown file, as explained above. Remember what you named it (we suggest naming it in a similar way to how we have already done with other files).
2. Download the icon you would like to use.
3. Save the icon in the "icons" folder (inside the "media" folder).
4. **Make sure the icon has the EXACT SAME NAME as the markdown file you created, with "icon-" added to the front.**
5. Save your work and we do the rest!
---

## The Cheat Sheet
Now that you know how to create a file, let's run through the Markdown syntax (special symbols we will be using).

### Regular Text
To copy in/write in regular text, such as a post you want to make, an article or any paragraph text, simply write it in the file like this! No symbols required!

### Headings
To create a heading, add a certain number of hashtags (#) in front, followed by a space, and then the heading text. Ensure the heading is on its own new line.  
The number of hashtags determines the **level** of the heading. **More hashtags = a smaller/"less important" heading.**  
For example:
`# This heading is most important`
# This heading is important
`## This heading is second`
## This heading is second
`### This heading is least important`
### This heading is least important
You can add up to 6 hashtags, but we recommend sticking to 3.  
*Common mistakes:*  
#This is not a heading
`### This is a heading, as well as all of this text until the end of the line.`
### This is a heading, as well as all of this text until the end of the line.
### Bold and italics
To create text in **bold**, add 2 stars ( ** ) before and after the text you want to make bold. Do not leave a space between the stars and the text.   
For example:  
`**This is bold text** and ** this is not bold text**`
**This is bold text** and ** this is not bold text**

To create text in *italics*, add 1 star ( * ) before and after the text you want to make italic. Do not leave a space between the stars and the text.  
For example:
`*This is italic text* and *this is not italic text *`
*This is italic text* and *this is not italic text *

### Lists 
To create an **unordered list** (i.e., a list with dots or dashes), add 1 star (*) in front of each item in the list, followed by a space, and then the text. Make sure each item is on its own new line.  
For example:  
```
* This is a list item
* This is another list item
    * This is a list item which is indented
* This is a third list item
*This is not a list item
```
* This is a list item
* This is another list item
    * This is a list item which is indented
* This is a third list item
*This is not a list item

To create an **ordered list** (i.e., a list with numbers or letters) write it as if you were writing a normal numbered list.  
For example:  
```
1. This is a list item
2. This is another list item  
    i. This is a list item which is indented  
    ii. This is a list item which is indented  
3. This is a third list item
4.This is not a list item
```
1. This is a list item
2. This is another list item  
    i. This is a list item which is indented  
    ii. This is a list item which is indented  
3. This is a third list item
4.This is not a list item

### Links
To create a link, write the text like this:
`[Text that displays on the page](url)`  
For example: `[This is a link to the markdown documentation](https://www.markdownguide.org/cheat-sheet/)`
[This is a link to the markdown documentation](https://www.markdownguide.org/cheat-sheet/) 

### Images
To link an image, write the text like this:
`![Alternative text to the image](link/path to the image)`
For example: ![This is an image of a bird on unsplash](https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80)

### PDFs  
To link a **PDF on a page in resources**, write the following and change the text inside () to include a path to your pdf. Please keep all PDFs in the folder called **pdfs** inside **public** to keep organized.  
`[PDF Name](/pdfs/FILE PATH TO YOUR PDF)`

To link a **PDF on a page on the learning portal**,write the following and change the text inside () to include a path to your pdf. Please keep all PDFs in the folder called **PORTAL** inside **pdfs** (inside public) to keep organized. 
`[PDF Name](/pdfs/PORTAL/FILE PATH TO YOUR PDF)`

### Videos
To link a youtube video, go onto youtube, right click on the video when watching it, and select **"Copy embed code"**, paste what you copied EXACTLY into the markdown file. All done!  

For a more detailed explanation, watch this [tutorial](https://www.youtube.com/watch?v=vGHrJDmepI0).

### New Lines
In order to add a new line, press the spacebar twice (2 times) at the end of your sentence, and then press enter. This tells markdown to start the text that follows on a new line.  
This is best seen when viewing the file your web browser. For example:

This is text.  
This is text that follows on a new line.  

This is text.
This text does not follow on a new line, but follows directly after.

### Special Awards
Add a markdown file to the directory `markdown/articles/special-awards`, 
For the awards to be ordered from newest to oldest, the name of the markdown file must begin with the date on which the file was added to the website (Not the original date of the award) in the format `yyyy-mm-dd`
For example, a file named `special-award.md` will be saved as `2024-03-24-special-award.md` if it was added on `2024-03-24`, regardless of when the actual award was given to the recipient

The markdown file should contain the following, but the `image` entry is optional:  
```
---
year: 'year'
name: 'Award Name'
hospital: 'hospital(s)'
location: 'Province/Country'
image: '/media/special-awards/image-name.jpeg' 
date: 'yyyy-mm-dd'
---
Description of the award
```
Images (if needed) must be stored in the directory `public/media/special-awards/`
Note that the path of the image in the markdown document **must** start with `/media/special-awards/`