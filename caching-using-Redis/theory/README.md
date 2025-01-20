# Caching Using Redis
**Redis** ( **RE**mote **DI**ctionary **S**erver ) is an open-source, in-memory data structure store that can be used as a database, cache, and message broker. Renowned for its exceptional speed and flexibility, Redis is ideal for real-time applications where low latency and high performance are critical. It supports a variety of data structures, including strings, hashes(key-), lists, sets, and sorted sets, enabling developers to address diverse use cases efficiently. Additionally, Redis offers features like persistence, publish-subscribe messaging, replication, and clustering, making it a versatile tool for modern applications. 
<img src="./redis-logo.png" alt="redis-logo" width=90% />


Trusted by leading companies such as Twitter, Pinterest, GitHub, and StackOverflow, Redis has become a popular choice for scenarios requiring fast data access and scalable solutions. Its ability to combine simplicity with powerful functionality makes it a cornerstone in the world of high-performance computing.


## Installation

### Step 1 : Install WSL  ( Windows Subsystem for Linux )
- Redis is designed for Linux environments, and WSL allows it to run natively on Windows without any porting issues. 
- It allows us to run a Linux environment directly on our Windows machine without the need for a virtual machine or dual boot. 
- It provides a lightweight and seamless way to run Linux tools and applications alongside your Windows setup.

- Open PowerShell as Administrator and enable WSL :
    ```
        wsl --install
    ```
    This will install WSL with the default Linux distribution (usually Ubuntu)

    <img src="./redis-wsl-install.png" alt="redis-wsl-install" width=90% />

### Step 2 : Open WSL Terminal

- Ubuntu Installed
    <img src="./redis-wsl-installed.png" alt="redis-wsl-installed" width=90% />

- After installation, open WSL terminal by searching for "Ubuntu" or the Linux distribution installed.

    <img src="./redis-open-ubuntu-terminal.png" alt="redis-open-ubuntu-terminal" width=90% />

### Step 3 : Update Linux Packages

- Update the package manager inside WSL

    ```
        sudo apt update
    ```
    <img src="./redis-wsl-upgradation.png" alt="redis-wsl-upgradation" width=90% />

- Upgrade the package manager inside WSL

    - Run the below command

        ```
            sudo apt upgrade
        ```
        <img src="./redis-wsl-upgrade.png" alt="redis-wsl-upgrade" width=90% />
    
    - Type **"Y"** and press **Enter**

        <img src="./redis-wsl-upgrade2.png" alt="redis-wsl-upgrade2" width=90% />

### Step 4 : Install Redis

- Install Redis:
    ```
        sudo apt install redis-server
    ```
    <img src="./redis-install-redis-server.png" alt="redis-install-redis-server" width=90% />

- Type the *password* and press **Enter**

    <img src="./redis-installed-redis-server.png" alt="redis-installed-redis-server" width=90% />

### Step 5 : Start Redis

- After installation, start the Redis server

    ```
        sudo service redis-server start
    ```

    <img src="./redis-start-redis-server.png" alt="redis-start-redis-server" width=90% />

### Step 6 : Verify Redis Installation

- Check if Redis is running

    ```
        redis-cli
    ```
    <img src="./redis-verify-cli.png" alt="redis-verify-cli" width=90% />

- Once in the Redis-CLI, type `PING`

    ```
        PING
    ```

    If everything is set up correctly, it will respond with `PONG`

    <img src="./redis-verify-ok.png" alt="redis-verify-ok" width=90% />
