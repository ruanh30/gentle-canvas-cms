<?php

namespace App\Http\Controllers;

use App\Models\Language;
use App\Models\User\Language as UserLanguage;
use Artisan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class UpdateController extends Controller

{
    public function recurse_copy($src, $dst)
    {
        $srcPath = base_path($src);
        $dstPath = base_path($dst);

        // If source is not a directory, copy the file directly
        if (!is_dir($srcPath)) {
            @mkdir(dirname($dstPath), 0775, true);
            return copy($srcPath, $dstPath);
        }

        $dir = opendir($srcPath);
        @mkdir($dstPath, 0775, true);

        while (false !== ($file = readdir($dir))) {
            if (($file != '.') && ($file != '..')) {
                $currentSrc = $srcPath . DIRECTORY_SEPARATOR . $file;
                $currentDst = $dstPath . DIRECTORY_SEPARATOR . $file;

                if (is_dir($currentSrc)) {
                    $this->recurse_copy($src . DIRECTORY_SEPARATOR . $file, $dst . DIRECTORY_SEPARATOR . $file);
                } else {
                    copy($currentSrc, $currentDst);
                }
            }
        }
        closedir($dir);
    }

    public function upversion()
    {

        $assets = array(
            /* *********************************
             * replace admin css & js 
             * *********************************/
            ['path' => 'public/assets/admin/css/custom.css', 'type' => 'folder', 'action' => 'replace'],
            ['path' => 'public/assets/admin/js/custom.js', 'type' => 'file', 'action' => 'replace'],

            /* *********************************
             * replace user dashboard css & js 
             * *********************************/
            ['path' => 'public/assets/user/js', 'type' => 'folder', 'action' => 'replace'],

            /* **************************************
             * replace user website css, js & images
             * **************************************/
            ['path' => 'public/assets/user-front/css/common/header-1.css', 'type' => 'file', 'action' => 'replace'],
            ['path' => 'public/assets/user-front/css/common/inner-pages.css', 'type' => 'file', 'action' => 'replace'],
            ['path' => 'public/assets/user-front/css/common/style.css', 'type' => 'file', 'action' => 'replace'],
            ['path' => 'public/assets/user-front/css/jewellery', 'type' => 'folder', 'action' => 'replace'],
            ['path' => 'public/assets/user-front/css/pet', 'type' => 'folder', 'action' => 'replace'],
            ['path' => 'public/assets/user-front/css/skinflow', 'type' => 'folder', 'action' => 'replace'],

            // Add User Front Images 
            ['path' => 'public/assets/user-front/images/jewellery', 'type' => 'folder', 'action' => 'add'],
            ['path' => 'public/assets/user-front/images/pet', 'type' => 'folder', 'action' => 'add'],
            ['path' => 'public/assets/user-front/images/skinflow', 'type' => 'folder', 'action' => 'add'],

            //replace theme images
            ['path' => 'public/assets/front/img/user/themes/', 'type' => 'folder', 'action' => 'replace'],

            // Replace User Front Js 
            ['path' => 'public/assets/user-front/js/cart.js', 'type' => 'file', 'action' => 'replace'],
            ['path' => 'public/assets/user-front/js/product-search.js', 'type' => 'file', 'action' => 'replace'],
            ['path' => 'public/assets/user-front/js/script.js', 'type' => 'file', 'action' => 'replace'],
            ['path' => 'public/assets/user-front/js/shop.js', 'type' => 'file', 'action' => 'replace'],
            ['path' => 'public/assets/user-front/js/user-checkout.js', 'type' => 'file', 'action' => 'replace'],

            // Replace Core Files & Folders
            ['path' => 'app', 'type' => 'folder', 'action' => 'replace'],
            ['path' => 'resources/views', 'type' => 'folder', 'action' => 'replace'],
            ['path' => 'database/migrations', 'type' => 'folder', 'action' => 'replace'],
            ['path' => 'routes/admin.php', 'type' => 'file', 'action' => 'replace'],
            ['path' => 'routes/user-front.php', 'type' => 'file', 'action' => 'replace'],
            ['path' => 'routes/user.php', 'type' => 'file', 'action' => 'replace'],
            ['path' => 'routes/web.php', 'type' => 'file', 'action' => 'replace'],

            ['path' => 'version.json', 'type' => 'file', 'action' => 'replace']
        );

        foreach ($assets as $key => $asset) {
            // if updater need to replace files / folder (with/without content)
            if ($asset['action'] == 'replace') {
                if ($asset['type'] == 'file') {
                    copy(base_path('public/updater/' . $asset["path"]), base_path($asset["path"]));
                }
                if ($asset['type'] == 'folder') {
                    $this->delete_directory($asset["path"]);
                    $this->recurse_copy('public/updater/' . $asset["path"], $asset["path"]);
                }
            }
            // if updater need to add files / folder (with/without content)
            elseif ($asset['action'] == 'add') {
                if ($asset['type'] == 'folder') {
                    @mkdir(base_path($asset["path"]), 0775, true);
                    $this->recurse_copy('public/updater/' . $asset["path"], $asset["path"]);
                }
            }
        }
        //update language files and database recordes with new keywords
        $this->updateLanguage();
        Artisan::call('migrate');
        Artisan::call('config:clear');

        Session::flash('success', 'Updated successfully');
        return redirect('updater/success.php');
    }

    function delete_directory($dirname)
    {
        $dir_handle = null;
        if (is_dir($dirname))
            $dir_handle = opendir($dirname);

        if (!$dir_handle)
            return false;
        while ($file = readdir($dir_handle)) {
            if ($file != "." && $file != "..") {
                if (!is_dir($dirname . "/" . $file))
                    unlink($dirname . "/" . $file);
                else
                    $this->delete_directory($dirname . '/' . $file);
            }
        }
        closedir($dir_handle);
        rmdir($dirname);
        return true;
    }


    public function redirectToWebsite(Request $request)
    {
        $arr = ['WEBSITE_HOST' => $request->website_host];
        setEnvironmentValue($arr);
        Artisan::call('config:clear');

        return redirect()->route('index');
    }

    /**
     * Update language files and database records with new keywords
     */
    public function updateLanguage()
    {
        try {
            // Define keywords to add
            $keywordGroups = [
                'admin' => [
                    'INVOICE' => 'INVOICE',
                    'Order No' => 'Order No',
                    'Date' => 'Date',
                    'Bill to' => 'Bill to',
                    'Name' => 'Name',
                    'Email' => 'Email',
                    'Phone' => 'Phone',
                    'Order Details' => 'Order Details',
                    'Order Id' => 'Order Id',
                    'Order Price' => 'Order Price',
                    'Payment Status' => 'Payment Status',
                    'Rejected' => 'Rejected',
                    'Completed' => 'Completed',
                    'Package Title' => 'Package Title',
                    'Expire Date' => 'Expire Date',
                    'Currency' => 'Currency',
                    'Price' => 'Price',
                    'Thanks & Regards' => 'Thanks & Regards'
                ],
                'user' => [
                    'Pet' => 'Pet',
                    'Skinflow' => 'Skinflow',
                    'Jewellery' => 'Jewellery',
                    'NO PRODUCT SECTION FOUND' => 'NO PRODUCT SECTION FOUND',
                    'Sections' => 'Sections',
                    'Product' => 'Product',
                    'Product Sections' => 'Product Sections',
                    'Select Status' => 'Select Status',
                    'Item Highlights' => 'Item Highlights',
                    'Update Item Highlights' => 'Update Item Highlights',
                    'Categories Count' => 'Categories Count',
                    'Enter categories count' => 'Enter categories count',
                    'Flash Sale Items Count' => 'Flash Sale Items Count',
                    'Enter flash sale items count' => 'Enter flash sale items count',
                    'Top Selling Items' => 'Top Selling Items',
                    'Enter top selling count' => 'Enter top selling count',
                    'Top Rated Items' => 'Top Rated Items',
                    'Enter top rated count' => 'Enter top rated count',
                    'Subcategories Count' => 'Subcategories Count',
                    'Enter subcategories count' => 'Enter subcategories count',
                    'Enter latest products count' => 'Enter latest products count',
                    'Latest Items Count' => 'Latest Items Count',
                    '404 Page Title' => '404 Page Title',
                    'Category Background Image' => 'Category Background Image',
                    'Recommended Image size : 210x210' => 'Recommended Image size : 210x210',
                    'Recommended Image size : 220x340' => 'Recommended Image size : 220x340',
                    'Recommended Image size : 100x100' => 'Recommended Image size : 100x100',
                    'Recommended Image size : 120X190' => 'Recommended Image size : 120X190',
                    'Background Color' => 'Background Color',
                    'Header left side text' => 'Header left side text',
                    'Header right side text' => 'Header right side text',
                    'Background Color' => 'Background Color',
                    'Hero Image' => 'Hero Image',
                    'Product Section' => 'Product Section',
                    'Top Rated Product Section Subtitle' => 'Top Rated Product Section Subtitle'
                ],
                'front' => [
                    'Search Product' => 'Search Product',
                    "NO PRODUCTS FOUND"=> "NO PRODUCTS FOUND",
                    "Products Available"=> "Products Available",
                    "Product Available"=> "Product Available",
                    "INVOICE"=> "INVOICE",
                    "NO DATA FOUND"=> "NO DATA FOUND",
                    "End offer"=> "End offer"
                ]
            ];

            // Process file-based languages
            $this->processFileBasedLanguages($keywordGroups['admin'], 'admin');
            $this->processFileBasedLanguages($keywordGroups['user'], 'user');

            // Process database-stored languages
            $this->processDatabaseLanguages($keywordGroups['front'], UserLanguage::class, 'keywords');
            $this->processDatabaseLanguages($keywordGroups['front'], Language::class, 'customer_keywords');

            return;
        } catch (\Exception $e) {
        }
    }

    /**
     * Process language files for a specific type (admin/user)
     */
    protected function processFileBasedLanguages(array $keywords, string $type)
    {
        $languages = Language::all()->pluck('code');
        $languages->push('default'); // Include default language file

        $languages->each(function ($langCode) use ($keywords, $type) {
            $this->updateJsonLanguageFile("resources/lang/{$type}_{$langCode}.json", $keywords);

            // Skip if this is already the default file
            if ($langCode !== 'default') {
                $this->updateJsonLanguageFile("resources/lang/{$type}_default.json", $keywords);
            }
        });
    }

    /**
     * Update a single JSON language file
     */
    protected function updateJsonLanguageFile(string $relativePath, array $keywords)
    {
        $filePath = base_path($relativePath);

        try {
            $contents = file_exists($filePath) ? file_get_contents($filePath) : '{}';
            $data = json_decode($contents, true) ?? [];

            $updated = false;
            foreach ($keywords as $key => $value) {
                if (!array_key_exists($key, $data)) {
                    $data[$key] = $value;
                    $updated = true;
                }
            }

            if ($updated) {
                file_put_contents(
                    $filePath,
                    json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
                );
            }
        } catch (\Exception $e) {
        }
    }

    /**
     * Process languages stored in database
     */
    protected function processDatabaseLanguages(array $keywords, string $modelClass, string $column)
    {
        try {
            $modelClass::chunk(100, function ($records) use ($keywords, $column) {
                foreach ($records as $record) {
                    try {
                        $data = json_decode($record->{$column}, true) ?? [];
                        $updated = false;

                        foreach ($keywords as $key => $value) {
                            if (!array_key_exists($key, $data)) {
                                $data[$key] = $value;
                                $updated = true;
                            }
                        }

                        if ($updated) {
                            $record->{$column} = json_encode($data, JSON_UNESCAPED_UNICODE);
                            $record->save();
                        }
                    } catch (\Exception $e) {
                    }
                }
            });
        } catch (\Exception $e) {
        }
    }
}
