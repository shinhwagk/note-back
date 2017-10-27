import os

path = "./index"


def flush(path):
    try:
        for filename in os.listdir(path):
            dirPath = os.path.join(path, filename)
            filePath = dirPath + ".json"
            if os.path.isdir(dirPath) and os.path.exists(filePath):
                os.rename(filePath, os.path.join(dirPath, ".index.json"))
                print(dirPath)
            flush(dirPath)
    except BaseException, e:
        print(e)


flush(path)
