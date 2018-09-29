(function() {
    "use strict";

    kintone.events.on('app.record.detail.show', function(event) {
        var body = {
            "app": event.appId,
            "id": event.recordId
        };
        kintone.api(kintone.api.url('/k/v1/record', true), 'GET', body, function(resp) {
            // success
            alert('该条记录的创建人是：' + resp.record['创建人'].value.name);
        }, function(error) {
            // error
            console.log(error);
        });
    });
    kintone.events.on('app.record.index.show', function(event) {
        // 显示颜色
        var fontColorRed = '#FF0000';
        var fontColorYellow = '#FFFF00';

        var elCustomer = kintone.app.getFieldElements('下拉菜单');
        var elAccuracy = kintone.app.getFieldElements('数值_0');
        if (event.records != null && event.records.length > 0) {
            event.records.forEach(function(record, index) {
                if (record['数值'].value > 200) {
                    elCustomer[index].style.color = fontColorRed;
                    elCustomer[index].style.backgroundColor = fontColorYellow;
                    elAccuracy[index].style.color = fontColorRed;
                    elAccuracy[index].style.backgroundColor = fontColorYellow;
                }
            });
        }

        //设置按钮
        var myIndexButton = document.getElementById('my_index_button');
        if (myIndexButton == null) {
            myIndexButton = document.createElement('button');
            myIndexButton.id = 'my_index_button';
            myIndexButton.innerHTML = '列表de按钮';

            myIndexButton.onclick = function() {
                var myHeaderSpace = kintone.app.getHeaderSpaceElement();
                var myListHeaderDiv = document.createElement('div');
                myListHeaderDiv.style.width = '100%';
                myListHeaderDiv.style.height = '35px';
                myListHeaderDiv.style.textAlign = 'center';
                myListHeaderDiv.style.fontSize = '30px';
                myListHeaderDiv.style.fontWeight = 'bold';
                myListHeaderDiv.style.backgroundColor = '#ffd78c';
                myListHeaderDiv.innerHTML = '你按了吧？按了才出来的的的。。。';

                myHeaderSpace.innerHTML = null;
                myHeaderSpace.appendChild(myListHeaderDiv);
            };

            kintone.app.getHeaderMenuSpaceElement().appendChild(myIndexButton);
        }
        var labelInfo = document.getElementById('labelInfoIdForInfo');
        if (labelInfo == null) {
            labelInfo = document.createElement('label');
            labelInfo.id = 'labelInfoIdForInfo';
            labelInfo.innerHTML = '用户数大于200的字段，背景色为黄色，字体颜色为红色';
            labelInfo.style.backgroundColor = fontColorYellow;
            kintone.app.getHeaderMenuSpaceElement().appendChild(labelInfo);
        }
    });
})();