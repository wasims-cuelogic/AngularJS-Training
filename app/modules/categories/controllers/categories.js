(function () {

    'use strict';

    angular
        .module('categories')
        .controller('categoriesController', ['$scope', '_', categoriesController])
        .directive('treeModel', treeModel);

    function findParentIds(array, id) {
        if (typeof array != 'undefined') {
            for (var i = 0; i < array.length; i++) {
                if (array[i].id == id) {
                    return [id];
                }
                var a = findParentIds(array[i].children, id);
                if (a != null) {
                    a.unshift(array[i].id);
                    return a;
                }
            }
        }
        return null;
    }

    function expandTree(obj, collapsedIds) {

        var collapsedIds = collapsedIds;

        for (var key in obj) {

            if (collapsedIds.indexOf(obj[key]) >= 0) {

                var myObj = obj;
                myObj.collapsed = false;
                myObj.selected = "selected";               

            }

            if (obj[key] !== null && typeof obj[key] === "object") {

                expandTree(obj[key], collapsedIds);
            }
        }
    }

    function collapseTree(obj) {

        for (var key in obj) {

            if (obj[key] !== null && typeof obj[key] === "object") {

                var myObj = obj;
                myObj.collapsed = true; 
                              

                collapseTree(obj[key]);
                myObj.selected = ""; 
            }
        }
    }


    function categoriesController($scope, _) {

        $scope.collapseIds = [];

        $scope.setCategory = function (searchId) {

            collapseTree($scope.categories)

            $scope.collapseIds = findParentIds($scope.categories, searchId);

            expandTree($scope.categories, $scope.collapseIds)
        }

        $scope.$watch('category.currentNode', function (newObj, oldObj) {
            if ($scope.category && angular.isObject($scope.category.currentNode)) {
                console.log('Node Selected!!');
                console.log($scope.category.currentNode);
            }
        }, false);

        $scope.categories =
            [
                {
                    "name": "Electronics", "id": "1", "children": [
                        {
                            "name": "Mobiles", "id": "11", "children": [
                                {
                                    "name": "Samsung", "id": "111", "children": [
                                        { "name": "SAMSUNG Galaxy On5 (Gold, 8 GB)", "id": "1111", "children": [] },
                                        { "name": "SAMSUNG Galaxy On7 (Black, 8 GB)", "id": "1112", "children": [] }
                                    ], collapsed: true
                                }
                            ], collapsed: true
                        },
                        {
                            "name": "Laptops", "id": "12", "children": [
                                {
                                    "name": "HP", "id": "121", "children": [
                                        { "name": "HP Core i5 6th Gen", "id": "1211", "children": [] },
                                        { "name": "HP APU Quad Core A8 6th Gen", "id": "1212", "children": [] }
                                    ], collapsed: true
                                },
                                {
                                    "name": "Dell", "id": "122", "children": [
                                        { "name": "Dell Inspiron Core i3 5th Gen", "id": "1221", "children": [] },
                                        { "name": "Dell Pentium Quad Core", "id": "1222", "children": [] }
                                    ], collapsed: true
                                }
                            ], collapsed: true
                        }
                    ], collapsed: true
                },
                {
                    "name": "Men", "id": "2", "children": [
                        {
                            "name": "Clothing", "id": "21", "children": [
                                { "name": "T-Shirts", "id": "211", "children": [] },
                                { "name": "Shirts", "id": "212", "children": [] }
                            ], collapsed: true
                        },
                        {
                            "name": "Footwear", "id": "22", "children": [
                                { "name": "Sports Shoes", "id": "221", "children": [] },
                                { "name": "Casual Shoes", "id": "222", "children": [] }
                            ], collapsed: true
                        }
                    ], collapsed: true
                },
                {
                    "name": "Women", "id": "3", "children": [
                        {
                            "name": "Beauty & Grooming", "id": "31", "children": [
                                { "name": "Make-up", "id": "311", "children": [] },
                                { "name": "Skin Care", "id": "312", "children": [] }
                            ], collapsed: true
                        },
                        {
                            "name": "Footwear", "id": "32", "children": [
                                { "name": "Flats", "id": "321", "children": [] },
                                { "name": "Heels", "id": "322", "children": [] }
                            ], collapsed: true
                        }
                    ], collapsed: true
                }
            ];
    }

    function treeModel($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                //tree id
                var treeId = attrs.treeId;

                //tree model
                var treeModel = attrs.treeModel;

                //node id
                var nodeId = attrs.nodeId || 'id';

                //node label
                var nodeLabel = attrs.nodeLabel || 'label';

                //children
                var nodeChildren = attrs.nodeChildren || 'children';

                //tree template
                var template =
                    '<ul>' +
                    '<li data-ng-repeat="node in ' + treeModel + '">' +
                    '<i class="collapsed" data-ng-show="node.' + nodeChildren + '.length && node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
                    '<i class="expanded" data-ng-show="node.' + nodeChildren + '.length && !node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
                    '<i class="normal" data-ng-hide="node.' + nodeChildren + '.length"></i> ' +
                    '<span data-ng-class="node.selected" data-ng-click="' + treeId + '.selectNodeLabel(node)">{{node.' + nodeLabel + '}}</span>' +
                    '<div data-ng-hide="node.collapsed" data-tree-id="' + treeId + '" data-tree-model="node.' + nodeChildren + '" data-node-id=' + nodeId + ' data-node-label=' + nodeLabel + ' data-node-children=' + nodeChildren + '></div>' +
                    '</li>' +
                    '</ul>';


                //check tree id, tree model
                if (treeId && treeModel) {

                    //root node
                    if (attrs.angularTreeview) {

                        //create tree object if not exists
                        scope[treeId] = scope[treeId] || {};

                        //if node head clicks,
                        scope[treeId].selectNodeHead = scope[treeId].selectNodeHead || function (selectedNode) {
                            //Collapse or Expand
                            selectedNode.collapsed = !selectedNode.collapsed;
                        };

                        //if node label clicks,
                        scope[treeId].selectNodeLabel = scope[treeId].selectNodeLabel || function (selectedNode) {

                            //remove highlight from previous node
                            if (scope[treeId].currentNode && scope[treeId].currentNode.selected) {
                                scope[treeId].currentNode.selected = undefined;
                            }

                            //set highlight to selected node
                            selectedNode.selected = 'selected';

                            //set currentNode
                            scope[treeId].currentNode = selectedNode;
                        };
                    }

                    //Rendering template.
                    element.html('').append($compile(template)(scope));
                }
            }
        };
    }
})();