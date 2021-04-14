import os
import random
import time
from random import randrange

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By

driver = webdriver.Chrome(executable_path="C:\\Users\chaiy\Downloads\chromedriver.exe")
baseURL = "https://www.copy.ai/sign-in"
driver.maximize_window()
driver.get(baseURL)

time.sleep(60)
titleBlog = ["running for weight loss", "running improvement", "healthcheck ups and running", "speed vs endurance running", "running and diet", "running on treadmill","running community","running mental motivation"]
descriptionBlog = ["How Running Helps You Lose Weight", "Transitioning from a beginner to intermediate runner", "Why Do We Need Regular Checkups After Running?", "Is Running Speed Or Endurance More Important For Improving Performance?","Is Your Diet Sabotaging Your Marathon Training?", "How to run effectively on the treadmill", "How to build your own running community", "How to stay motivated mentally during a run"]
# driver.find_element_by_xpath("/html/body").send_keys('\ue009','\ue007')
# time.sleep(10)

for i in range(9):
    while True:
        try:
            driver.find_element_by_xpath("/html/body/div[10]/div/div[3]/form/div/div[2]/div[2]/div[2]/input").clear()
            driver.find_element_by_xpath("/html/body/div[10]/div/div[3]/form/div/div[2]/div[2]/div[2]/textarea").clear()
            driver.find_element_by_xpath("/html/body/div[10]/div/div[3]/form/div/div[2]/div[2]/div[2]/input").send_keys(titleBlog[i])
            driver.find_element_by_xpath("/html/body/div[10]/div/div[3]/form/div/div[2]/div[2]/div[2]/textarea").send_keys(descriptionBlog[i])
            driver.find_element_by_xpath("/html/body").send_keys('\ue009','\ue007')
            break
        except Exception as e:
            print(e)
            time.sleep(5)
            driver.find_element_by_xpath("/html/body/div[10]/div/div[3]/form/div/div[2]/div[2]/div[2]/input").clear()
            driver.find_element_by_xpath("/html/body/div[10]/div/div[3]/form/div/div[2]/div[2]/div[2]/textarea").clear()
            driver.find_element_by_xpath("/html/body/div[10]/div/div[3]/form/div/div[2]/div[2]/div[2]/input").send_keys(titleBlog[i])
            driver.find_element_by_xpath("/html/body/div[10]/div/div[3]/form/div/div[2]/div[2]/div[2]/textarea").send_keys(descriptionBlog[i])
            driver.find_element_by_xpath("/html/body").send_keys('\ue009','\ue007')
    time.sleep(10)
    blogHTMLHead = """<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0" /> -->
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="theme-color" content="#009578" />
        <title>TwoPointFour Intervals</title>
        <link rel="stylesheet" href="../css/bootstrap.min.css" />
        <link rel="stylesheet" href="../src/master.css" />
        <link rel="manifest" href="../manifest.json" />
        <link rel="apple-touch-icon" href="../images/icon_x128apple.png" />
        <link rel="icon" href="../images/icon_x48.png" />
        <link rel="serviceWorker" href="../sw.js" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <script type="module" src="../src/db.js"></script>
        <script type="module" src="../src/index.js"></script>
      </head>
      <body>
          <div class="container-fluid Logo">
          <div class="row d-flex justify-content-start navContainer">
            <div class="col-lg-3">
              <img src="../images/icon_x48.png" alt="logo" width="48" height="48" />
              <span class="logoname">TwoPointFour</span>
            </div>
            <div class="col mt-3 head3">
              <a class="navitem homeBtn" href="../index.html" role="button">Home</a>
            </div>
            <div class="col mt-3 head3">
              <a class="navitem betaBtn" href="#../index.html" role="button">Beta Tester</a>
            </div>
            <div class="col mt-3 head3">
              <a class="navitem betaBtn" href="/blog/blog.html" role="button">Blog</a>
            </div>
          </div>
        </div>
        </div><div class="row spacer-sm"></div>
      <div class="container-fluid"><div class="row d-flex justify-content-center">
          <div class="row d-flex justify-content-center"><div class="col-8"><h1 class="head1">{}</h1></div></div>
        </div><div class="row spacer-xs"></div>
        </div>
    """.format(titleBlog[i])

    blogHTMLEnd = """</div>
      </body>
    </html> """

    blogHTMLElement = """<div class="row d-flex justify-content-center">
            <div class="col-8">

            </div>
        </div>"""
    blogHTMLElementHead = """<div class="row d-flex justify-content-center">
            <div class="col-8">"""
    blogHTMLElementEnd = """
            </div><div class="row spacer-xs"></div>
        </div>"""

    for i in range(12):
        while True:
            try:
                ideaText = driver.find_element(By.ID, "idea-1").get_attribute("original_text").replace("’","\'")
                break
            except Exception as e:
                print(e)
                driver.find_element_by_xpath("/html/body").send_keys('\ue009','\ue007')
                time.sleep(15)
                ideaText = driver.find_element(By.ID, "idea-1").get_attribute("original_text").replace("’","\'")
        blogHTMLElementHead += ideaText
        blogHTMLFinal = blogHTMLElementHead + blogHTMLElementEnd
        blogHTMLHead += blogHTMLFinal
        print(blogHTMLFinal)
        while True:
            try:
                driver.find_element_by_xpath("/html/body/div[10]/div/div[3]/form/div/div[2]/div[2]/div[2]/textarea").clear()
                driver.find_element_by_xpath("/html/body/div[10]/div/div[3]/form/div/div[2]/div[2]/div[2]/textarea").send_keys(ideaText[100:300])
                break
            except Exception as e:
                print(e)
                time.sleep(15)
                driver.find_element_by_xpath("/html/body/div[10]/div/div[3]/form/div/div[2]/div[2]/div[2]/textarea").clear()
                driver.find_element_by_xpath("/html/body/div[10]/div/div[3]/form/div/div[2]/div[2]/div[2]/textarea").send_keys(ideaText[100:300])
        driver.find_element_by_xpath("/html/body").send_keys('\ue009','\ue007')

        ideaText = ""
        blogHTMLElementHead = """<div class="row d-flex justify-content-center">
            <div class="col-8">"""
        blogHTMLElementEnd = """
            </div><div class="row spacer-xs"></div>
        </div>"""    
        blogHTMLFinal = ""
        time.sleep(15)

    blogHTMLHead += blogHTMLEnd

    filename = str(randrange(10)) + str(randrange(10)) + str(randrange(10)) +str(randrange(10)) +str(randrange(10)) +str(randrange(10)) + ".txt"
    wblog = open(filename , "w+", encoding='utf8')
    print("File Opened.")
    wblog.write(blogHTMLHead)
    wblog.close()
    print("File Closed.")


    print(blogHTMLHead)

# driver.find_element_by_xpath("/html/body/div[1]/div/div/a").click()



# while True:
#     try:
#         driver.find_element_by_xpath("/html/body/div[10]/div/div[3]/form/div/div[2]/div[2]/div[2]/div[11]/div/div[1]/a").click()
#     except:
#         continue

#     time.sleep(30)
#     datastored = []

#     for i in range(5+1):
#         k = "idea-" + str(i)
#         datastored.append(driver.find_element(By.ID, k).get_attribute("original_text"))

#     filename = str(randrange(10)) + str(randrange(10)) + str(randrange(10)) +str(randrange(10)) +str(randrange(10)) +str(randrange(10)) + ".txt"
#     wblog = open(filename , "w+")
#     print("File Opened.")

#     wblog.writelines(datastored)
#     wblog.close()
#     print("File Closed.")







"""
driver.find_element(By.ID, "txtNRIC").send_keys("T0037597C")
driver.find_element(By.ID, "txtPassword").send_keys("168816")
driver.find_element_by_xpath("/html/body/div[1]/div[2]/div[1]/article/div/div/div/div/div[2]/div[1]/div/div/form/div/input").click()
driver.switch_to.frame("leftFrame")
time.sleep(2)
driver.find_element_by_link_text("Booking without Fixed Instructor").click()
time.sleep(2)
driver.switch_to.default_content()
time.sleep(2)
driver.switch_to.frame("mainFrame")
time.sleep(2)
driver.find_element_by_xpath("/html/body/table/tbody/tr[4]/td[1]/input").click()
driver.find_element_by_xpath("/html/body/table/tbody/tr/td[2]/form/table/tbody/tr[1]/td/table/tbody/tr[1]/td[2]/table/tbody/tr[4]/td[1]/input").click()
driver.find_element_by_xpath("/html/body/table/tbody/tr/td[2]/form/table/tbody/tr[1]/td/table/tbody/tr[3]/td[2]/input[9]").click()
driver.find_element_by_xpath("/html/body/table/tbody/tr/td[2]/form/table/tbody/tr[1]/td/table/tbody/tr[6]/td[2]/input").click()
driver.find_element_by_xpath("/html/body/table/tbody/tr/td[2]/form/table/tbody/tr[3]/td[2]/input").click()
driver.switch_to_alert().accept()
for i in driver.find_elements_by_xpath("/html/body/table/tbody/tr/td[2]/form/table[1]/tbody/tr[10]/td/table/tbody/tr[3]/td[1]"):
    print(i.getText())
"""
"""
frames=driver.find_elements_by_tag_name("iframe")
driver.switch_to.frame(frames[0]);
delay()

#click on checkbox to activate recaptcha
driver.find_element_by_class_name("recaptcha-checkbox-border").click()

#switch to recaptcha audio control frame
driver.switch_to.default_content()
frames=driver.find_element_by_xpath("/html/body/div[2]/div[4]").find_elements_by_tag_name("iframe")
driver.switch_to.frame(frames[0])
delay()

#click on audio challenge
driver.find_element_by_id("recaptcha-audio-button").click()

#switch to recaptcha audio challenge frame
driver.switch_to.default_content()
frames= driver.find_elements_by_tag_name("iframe")
driver.switch_to.frame(frames[-1])
delay()

#click on the play button
driver.find_element_by_xpath("/html/body/div/div/div[3]/div/button").click()
#get the mp3 audio file
src = driver.find_element_by_id("audio-source").get_attribute("src")
print("[INFO] Audio src: %s"%src)
#download the mp3 audio file from the source
urllib.request.urlretrieve(src, os.getcwd()+"\\sample.mp3")
sound = pydub.AudioSegment.from_mp3(os.getcwd()+"\\sample.mp3")
sound.export(os.getcwd()+"\\sample.wav", format="wav")
sample_audio = sr.AudioFile(os.getcwd()+"\\sample.wav")
r= sr.Recognizer()

with sample_audio as source:
    audio = r.record(source)

#translate audio to text with google voice recognition
key=r.recognize_google(audio)
print("[INFO] Recaptcha Passcode: %s"%key)

#key in results and submit
driver.find_element_by_id("audio-response").send_keys(key.lower())
driver.find_element_by_id("audio-response").send_keys(Keys.ENTER)
driver.switch_to.default_content()
delay()
driver.find_element_by_id("recaptcha-demo-submit").click()
delay()


from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome(executable_path="C:\\Users\chaiy\Downloads\chromedriver.exe")
baseURL = "https://info.bbdc.sg/members-login/"
driver.maximize_window()
driver.get(baseURL)
driver.find_element(By.XPATH, "/html/body/div[1]/div[2]/div[1]/article/div/div/div/div/div[2]/div[1]/div/div/form/input[2]").click()
driver.find_element(By.ID, "txtNRIC").send_keys("T0037597C")
driver.find_element(By.ID, "txtPassword").send_keys("168816")
WebDriverWait(driver, 10).until(EC.frame_to_be_available_and_switch_to_it((By.CSS_SELECTOR,"iframe[name^='a-'][src^='https://www.google.com/recaptcha/api2/anchor?']")))
WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.XPATH, "//span[@id='recaptcha-anchor']"))).click()
driver.switch_to.default_content()
WebDriverWait(driver, 10).until(EC.frame_to_be_available_and_switch_to_it((By.CSS_SELECTOR,"iframe[title='recaptcha challenge']")))
WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button#recaptcha-audio-button"))).click()
driver.switch_to.default_content()
WebDriverWait(driver, 10).until(EC.frame_to_be_available_and_switch_to_it((By.CSS_SELECTOR,"iframe[title='recaptcha challenge']")))
WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "rc-audiochallenge-tdownload-link"))).click()
"""
