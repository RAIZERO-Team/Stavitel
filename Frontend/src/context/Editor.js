/*
==========================
imports functions from the 
config folder
==========================
*/

import blockManager from "./config/manager/blockManager_editor_BT.js";
import styleManager from "./config/manager/styleManager.js";
import assetManager from "./config/manager/assetManager.js";
import sectionDependencies from "./config/Dependencies/sectionDependencies.js";
import dependencyCDNLinks from "./config/Dependencies/dependencyCDNLinks.js";
import customScripts from "./config/Dependencies/customScripts.js";
import { checkExtension, loadingSpinner } from "./helpers/index.js";
import { addLocal, getLocal } from "./helpers/index.js";
import buttons from "./config/commands/buttons.js";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

class editor {
  constructor() {
    this.msg = new Notyf({
      duration: 3000,
      position: {
        x: "center",
        y: "top",
      },
    });
    this.config = {
      allowScripts: 1,
      showOffsets: 1,
      autorender: 0,
      noticeOnUnload: 0,
      container: "#stjs",
      height: "100%",
      fromElement: true,
      clearOnRender: 0,
      protectedCss:
        ".iframe-wrapper{padding-bottom:30px;}section:last-child{margin-bottom:30px}",
      canvas: {
        styles: [
          "https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap",
          "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.2/css/bootstrap.min.css",
          "https://cdnjs.cloudflare.com/ajax/libs/line-awesome/1.3.0/font-awesome-line-awesome/css/all.min.css",
          "./config/global/global.css",
        ],
        scripts: [
          "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.2/js/bootstrap.min.js",
          "./config/global/global.js",
        ],
      },
      // commands,
      assetManager,
      blockManager,
      styleManager,
      storageManager: {
        id: "stjs-",
        type: "local",
        autosave: 1,
        autoload: 1,
        stepsBeforeSave: 1,
        storeComponents: 1,
        storeStyles: 1,
        storeHtml: 1,
        storeCss: 1,
      },
    };

    this.appendDependencies();
  }

  // ============= Import model window function =============
  codeImportModal() {
    // ---------------------
    // Edit and Import
    // ---------------------

    // --------- create html variables ---------
    let prefix = this.editor.getConfig().stylePrefix;

    let modal_content_wrapper = document.createElement("div");
    modal_content_wrapper.id = "modal-wrapper";

    let btnEdit = document.createElement("button");
    let copyHtml = document.createElement("button");
    let copyCss = document.createElement("button");
    let exportTxt = document.createElement("button");
    let fileLoader = document.createElement("label");
    let anchor = document.createElement("a");
    let header_menus = document.createElement("div");
    let fileLoadInput = document.createElement("input");
    fileLoadInput.style.display = "none";
    fileLoadInput.setAttribute("type", "file");

    let htmlCodeEditor = this.buildCodeEditor("html");
    let cssCodeEditor = this.buildCodeEditor("css");

    btnEdit.innerHTML = '<i class="fa fa-code"></i> Apply & close';
    exportTxt.innerHTML = '<i class="fa fa-download"></i> Save as .gram file';
    copyHtml.innerHTML = '<i class="fa fa-copy"></i> Copy HTML';
    copyCss.innerHTML = '<i class="fa fa-copy"></i> Copy CSS';
    fileLoader.innerHTML = '<span class="fa fa-file"></span> Load .gram file';
    fileLoader.appendChild(fileLoadInput);

    header_menus.className = "header-menus";
    fileLoader.className = prefix + "import-file";
    btnEdit.className = "btn " + prefix + "btn-import";
    copyHtml.className = "btn " + prefix + "btn-html";
    copyCss.className = "btn " + prefix + "btn-css";
    exportTxt.className = "btn " + prefix + "btn-export";

    // --------- upload file function ---------
    fileLoadInput.onchange = (e) => {
      let currentFile = e.target.files[0];
      let fType = checkExtension(currentFile["name"]);
      if (currentFile === undefined) {
        this.msg.error("Please select a file");
        return;
      }
      const allowFileType = ["gram", "txt"];
      if (!allowFileType.includes(fType)) {
        this.msg.error("You can only import .gram or .txt extension");
        return;
      }
      let reader = new FileReader();
      reader.onload = (e) => {
        let fileData = e.target.result;
        this.editor.DomComponents.getWrapper().set("content", "");
        this.editor.setComponents(fileData);
        this.modal.close();
      };
      reader.readAsText(currentFile);
    };

    // import button inside import editor
    // ---------  ---------
    btnEdit.onclick = () => {
      let htmlCode = htmlCodeEditor.editor.getValue();
      let cssCode = cssCodeEditor.editor.getValue();
      this.editor.DomComponents.getWrapper().set("content", "");
      this.editor.setComponents(
        htmlCode.trim() + "<style>" + cssCode.trim() + "</style>"
      );
      this.modal.close();
    };

    // --------- Copy html code from canves function ---------
    copyHtml.onclick = () => {
      let htmlCodes = htmlCodeEditor.editor.getValue();
      let dummy = document.createElement("input");
      document.body.appendChild(dummy);
      dummy.setAttribute("value", htmlCodes);
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      document.execCommand("copy");
      this.msg.success("You have copied HTML codes!");
    };

    // --------- Copy css code from canves function ---------
    copyCss.onclick = () => {
      let cssCodes = cssCodeEditor.editor.getValue();
      let dummy = document.createElement("input");
      document.body.appendChild(dummy);
      dummy.setAttribute("value", cssCodes);
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
      document.execCommand("copy");
      this.msg.success("You have copied CSS codes!");
    };

    // onclick save as button inside import editor
    // --------- export code in txt *change here ---------
    exportTxt.onclick = () => {
      let InnerHtml = this.editor.getHtml();
      let Css = this.editor.getCss({ avoidProtected: true });
      let text = InnerHtml + "<style>" + Css + "</style>";
      let blob = new Blob([text], {
        type: "text/plain",
      });
      anchor.download = "download.gram";
      anchor.href = window.URL.createObjectURL(blob);
      anchor.target = "_blank";
      anchor.style.display = "none"; // just to be safe!
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    };

    // ---------  ---------
    header_menus.appendChild(fileLoader);
    header_menus.appendChild(exportTxt);
    header_menus.appendChild(copyCss);
    header_menus.appendChild(copyHtml);
    header_menus.appendChild(btnEdit);

    // import nav button click event
    // --------- edit model form ---------
    this.editor.Commands.add("html-edit", {
      run: (editor, sender) => {
        sender && sender.set("active", 0);

        let html_textarea_box = document.createElement("textarea");
        let css_textarea_box = document.createElement("textarea");

        let htmlBox = document.createElement("div");
        htmlBox.className = "html-wrapper";
        htmlBox.innerHTML = "<h4>HTML</h4>";
        htmlBox.appendChild(html_textarea_box);

        let cssBox = document.createElement("div");
        cssBox.className = "css-wrapper";
        cssBox.innerHTML = "<h4>CSS</h4>";
        cssBox.appendChild(css_textarea_box);

        let headline = document.createElement("div");
        headline.className = "clear-fix";

        if (!htmlCodeEditor.editor && !cssCodeEditor.editor) {
          modal_content_wrapper.appendChild(header_menus);
          modal_content_wrapper.appendChild(headline);
          modal_content_wrapper.appendChild(htmlBox);
          modal_content_wrapper.appendChild(cssBox);
          htmlCodeEditor.init(html_textarea_box);
          cssCodeEditor.init(css_textarea_box);
        }

        this.modal.setTitle("Edit and Import");
        this.modal.setContent("");
        this.modal.setContent(modal_content_wrapper);
        htmlCodeEditor.setContent(editor.getHtml());
        cssCodeEditor.setContent(editor.getCss({ avoidProtected: true }));
        this.modal.open();
        htmlCodeEditor.editor.refresh();
        cssCodeEditor.editor.refresh();
      },
    });
  }

  // --------- build code editor function ---------
  buildCodeEditor = (type) => {
    let codeEditor = this.editor.CodeManager.getViewer("CodeMirror").clone();
    codeEditor.set({
      codeName: type === "html" ? "htmlmixed" : "css",
      readOnly: 0,
      theme: "hopscotch",
      autoBeautify: true,
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineWrapping: true,
      styleActiveLine: true,
      smartIndent: true,
      indentWithTabs: true,
    });
    return codeEditor;
  };

  // --------- append dependencies function ---------
  appendDependencies() {
    // --------- server data ---------
    let dependencies = getLocal("gram-dependencies");

    let links = dependencies.map((d) => d.css);
    let scripts = dependencies.map((d) => d.js);

    // Append dependencies

    for (let l of links) {
      this.config.canvas.styles.push(l);
    }

    for (let s of scripts) {
      this.config.canvas.scripts.push(s);
    }
  }

  // --------- append custom script function ---------
  appendCustomScript = () => {
    // Append Custom Script
    let doc = this.editor.Canvas.getDocument();
    // --------- server data ---------
    let stjsScripts = getLocal("stjs-scripts");
    for (let s of stjsScripts) {
      const scriptEl = document.createElement("script");
      scriptEl.className = `${s.name}-script`;
      scriptEl.innerHTML = `window.addEventListener('DOMContentLoaded', (event) => {
            ${s.script}
        })`;
      doc.body.appendChild(scriptEl);
    }
  };

  // --------- add dependency function ---------
  addDependency = (dependency) => {
    let doc = this.editor.Canvas.getDocument();
    const appendDependency = () => {
      return new Promise((resolve, reject) => {
        // --------- server data ---------
        let dependencies = getLocal("gram-dependencies");
        let isDependencyExit = dependencies.filter(
          (d) => d.name === dependency
        );

        if (isDependencyExit.length !== 0) {
          resolve(dependency);
          return;
        }

        let ds = dependencyCDNLinks.find((d) => d.name === dependency);

        if (!ds) {
          resolve("skip");
          return;
        }

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.className = ds.name + "-script";
        link.href = ds.css;
        doc.head.appendChild(link);

        const script = document.createElement("script");
        script.src = ds.js;
        script.className = ds.name + "-script";
        doc.body.appendChild(script);

        dependencies.push(ds);

        // --------- server data ---------
        addLocal("gram-dependencies", dependencies);

        resolve(script);
      });
    };

    appendDependency().then((dep) => {
      if (dep === dependency) return;

      // --------- server data ---------
      let cScripts = getLocal("stjs-scripts");
      let isCustomScriptExit = cScripts.filter((d) => d.name === dependency);

      if (isCustomScriptExit.length !== 0) {
        return;
      }

      // Append custom script after the cdn script loaded
      dep.addEventListener("load", () => {
        const customScript = document.createElement("script");
        customScript.innerHTML = customScripts(dependency);
        customScript.className = `${dependency}-script`;
        doc.body.appendChild(customScript);

        // --------- server data ---------
        let customScriptArr = getLocal("stjs-scripts");
        customScriptArr.push({
          name: dependency,
          script: customScript.innerHTML,
        });

        // --------- server data ---------
        addLocal("stjs-scripts", customScriptArr);
      });
    });
  };

  // --------- remove dependency ---------
  removeDependency(dependency) {
    let doc = this.editor.Canvas.getDocument();

    // --------- server data ---------
    let customScript = getLocal("stjs-scripts");
    // Custom scripts
    for (let custom of customScript) {
      let allCustomScripts = doc.querySelectorAll(`.${custom.name}-script`);
      allCustomScripts.forEach((e) => (e.outerHTML = ""));
    }
    customScript = customScript.filter((c) => c.name !== dependency);
    // --------- server data ---------
    addLocal("stjs-scripts", customScript);

    // Dependencies / plugins
    // --------- server data ---------
    let dependencies = getLocal("gram-dependencies");
    if (dependencies.length == 0) return;

    for (let dp of dependencies) {
      let allScripts = doc.querySelectorAll(`.${dp.name}-script`);
      allScripts.forEach((e) => (e.outerHTML = ""));
    }

    dependencies = dependencies.filter((d) => d.name !== dependency);
    // --------- server data ---------
    addLocal("gram-dependencies", dependencies);
  }

  // --------- listen add dependencies ---------
  listenAddDependencies = () => {
    this.editor.on("component:add", (component) => {
      let section = component.attributes.attributes.id;

      let hasDependency = sectionDependencies.filter((e) => e.name === section);
      if (hasDependency.length !== 0) {
        let dependency = hasDependency[0].dependencies[0];
        this.addDependency(dependency);
      }
    });
  };

  // --------- listen remove dependencies ---------
  listenRemoveDependencies = () => {
    this.editor.on("component:remove", (component) => {
      let section = component.attributes.attributes.id;
      let hasDependency = sectionDependencies.filter((e) => e.name === section);
      if (hasDependency.length !== 0) {
        let dependency = hasDependency[0].dependencies[0];
        this.removeDependency(dependency);
      }
    });
  };

  // --------- init function ---------
  init() {
    this.editor = grapesjs.init(this.config);
    this.editor.Panels.addButton("options", buttons);
    this.modal = this.editor.Modal;
    this.codeImportModal();
    this.editor.Panels.removeButton("options", "export-template");
    this.editor.on("load", (editor) => {
      editor.Panels.getButton("views", "open-blocks").set("active", true);
      editor.BlockManager.getCategories().each((ctg) => {
        if (ctg.attributes.id === "Sections") {
          return;
        }
        ctg.set("open", false);
      });

      // ----------------------------------------
      // Load and show settings and style manager
      // ----------------------------------------
      let openTmBtn = editor.Panels.getButton("views", "open-tm");
      openTmBtn && openTmBtn.set("active", 1);
      let openSm = editor.Panels.getButton("views", "open-sm");
      openSm && openSm.set("active", 1);

      // Add Settings Sector
      let traitsSector = document.createElement("div");
      traitsSector.innerHTML =
        '<div class="stjs-sm-sector no-select">' +
        '<div class="stjs-sm-title"><span class="icon-settings fa fa-cog"></span> Settings</div>' +
        '<div class="stjs-sm-properties" style="display: none;"></div></div>';
      let traitsProps = traitsSector.querySelector(".stjs-sm-properties");
      traitsProps.append(document.querySelector(".stjs-trt-traits"));
      document
        .querySelector(".stjs-sm-sectors")
        .insertAdjacentElement("beforebegin", traitsSector);
      traitsSector
        .querySelector(".stjs-sm-title")
        .addEventListener("click", () => {
          let traitStyle = window.getComputedStyle(traitsProps);
          let hidden = traitStyle.display == "none";
          if (hidden) {
            traitsProps.style.display = "block";
          } else {
            traitsProps.style.display = "none";
          }
        });

      this.appendCustomScript();
    });

    this.editor.getWrapper().addClass("iframe-wrapper");
    this.editor.render();
    this.listenAddDependencies();
    this.listenRemoveDependencies();
  }
}

new editor().init();

loadingSpinner();
