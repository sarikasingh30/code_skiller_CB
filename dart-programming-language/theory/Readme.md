# Introduction to the Dart Programming Language: A Beginner’s Guide

Have you ever wondered what makes Flutter so powerful for mobile app development? At the core of every Flutter application is **Dart** — *a modern, flexible, and efficient programming language designed by Google*. Whether you're developing a mobile, web, or desktop application, understanding Dart is the first step to mastering Flutter.

<img src="./dart-logo.jpg" alt="dart-logo" width=90% />

Dart is known for its fast execution, null safety, and object-oriented structure, making it an excellent choice for cross-platform development. It supports both **Just-in-Time (JIT)** and **Ahead-of-Time (AOT)** compilation, Enabling developers to create applications with **hot reload (feature in Dart and Flutter that allows developers to see changes in their code instantly without restarting the entire application)** for quick iterations during development and optimized performance for production. 

Additionally, Dart’s asynchronous programming capabilities simplify handling network requests, database operations, and background tasks. With a syntax similar to JavaScript and Java, it’s easy for developers to learn and transition into Flutter development.

Now that we understand why Dart is essential for Flutter, let’s start with setting up Dart on our system. 🚀

## Dart Setup

### Download Dart SDK

1. **Open the link =>** *https://dart.dev/get-dart*

    <img src="./dart-download-link.png" alt="dart-download-link" width=90% />

2. **Scroll down and click on Download *SDK as a ZIP file***

    <img src="./dart-download-link2.png" alt="dart-download-link2" width=90% />

3. **After navigating to the new link, scroll down and click on *Dart SDK* under the Stable channel**

    <img src="./dart-download-stable-channel.png" alt="dart-download-stable-channel" width=90% />

### Unzip the Folder and Update Environment Variables

1. **Place the extracted folder in the Program Files directory on the C drive or While extracting select destination of Program Files in C drive.**

    <img src="./dart-unzip-folder-destination.png" alt="dart-unzip-folder-destination" width=90% />

2. **Add Dart bin folder path to System PATH**

    To make dart is accessible globally, add its directory to the system's PATH variable:

    - **Open Environment variables** 

        <img src="./open-edit-the-system-environment-variables.png" alt="open-edit-the-system-environment-variables" width=90%/>
        <img src="./environment-variable-system-variables.png" alt="environment-variable-system-variables" width=90%/>

    - **Paste the bin folder path here and click *OK***
        <img src="./dart-bin-link-added.png" alt="dart-bin-link-added" width=90%/>

### Verification

1. **Open Command Prompt (cmd) and type**

    ```
        dart --version
    ```
    
    <img src="./dart-verify-cmd.png" alt="dart-verify-cmd" width=90%/>

## First Dart Program

### Open a folder in VS Code and Add "Dart" Extension

<img src="./dart-etension-added-vscode.png" alt="dart-etension-added-vscode" width=90%/>

### Create a File with extension ".dart"

<img src="./dart-first-program-file-extension.png" alt="dart-first-program-file-extension" width=90%/>

### Change the Dart Cli Console 

1. **Open Settings**

    <img src="./dart-change-settings.png" alt="dart-change-settings" width=90%/>

2. **Search for dart in the search bar, scroll down to CLI Console, and change it to Terminal**

    <img src="./dart-cli-console-trminal.png" alt= "dart-cli-console-terminal" width=90% />

### Add the given code to the file

```
    void main(){
        print("Hello! Dart, Here is My First Program...");
    }
```
<img src="./dart-first-program-code.png" alt= "dart-first-program-code" width=90% />


### Run the code 

1. **Click on Run**

    <img src="./dart-first-program-run.png" alt= "dart-first-program-run" width=90% />

2. **Output**

    <img src="./dart-first-program-output.png" alt= "dart-first-program-output" width=90% />

## Dart Syntax Basics
