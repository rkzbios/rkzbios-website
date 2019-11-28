
import subprocess


NAME = "rkzbios-website"

def build():
    tag = subprocess.check_output(["git","describe"])[:-1]
    
    build_image = raw_input("Build a image with version %s y/n ...  " % tag)

    if build_image == "y":

        name = "%s:%s" % (NAME, tag)
        registry_name = "dockerregistry.jimboplatform.nl/" + name
        
        cmd = ["sudo","docker", "build", "-t", name, "."]
        subprocess.call(cmd)
        
        cmd = ["sudo","docker", "tag", name, registry_name]
        subprocess.call(cmd)

        push_image = raw_input("Push image to  dockerregistry.jimboplatform.nl y/n ...  ")

        if push_image == "y":

            cmd = ["sudo","docker", "login", "dockerregistry.jimboplatform.nl"]
            subprocess.call(cmd)
            
            cmd = ["sudo","docker", "push", registry_name]
            subprocess.call(cmd)
    

build()
